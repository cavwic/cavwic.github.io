param([int]$PollSeconds = 3)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$nodePath = (Get-Command node.exe -ErrorAction Stop).Source
$astroPath = Join-Path $projectRoot 'node_modules\astro\bin\astro.mjs'
$mutex = [System.Threading.Mutex]::new($false, 'Local\CavwicAstroPreview43201')
$ownsMutex = $false
$serverProcess = $null
$seenCodex = $false

function Test-CodexDesktop {
    $apps = Get-CimInstance Win32_Process -Filter "Name = 'ChatGPT.exe' OR Name = 'Codex.exe'" -ErrorAction SilentlyContinue
    return [bool]($apps | Where-Object {
        $_.ExecutablePath -match '\\WindowsApps\\OpenAI\.Codex_[^\\]+\\app\\ChatGPT\.exe$' -or
        $_.ExecutablePath -match '\\Codex\\(app\\)?Codex\.exe$'
    } | Select-Object -First 1)
}

function Get-ProjectAstro {
    $listener = Get-NetTCPConnection -LocalPort 43201 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $listener) { return $null }
    $processInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)" -ErrorAction SilentlyContinue
    if ($processInfo.Name -eq 'node.exe' -and $processInfo.CommandLine -and
        $processInfo.CommandLine.Contains($astroPath)) {
        return Get-Process -Id $listener.OwningProcess -ErrorAction SilentlyContinue
    }
    throw 'Port 43201 is occupied by another process; leaving it untouched.'
}

try {
    $ownsMutex = $mutex.WaitOne(0)
    if (-not $ownsMutex) { exit 0 }
    $serverProcess = Get-ProjectAstro
    if (-not $serverProcess) {
        $env:ASTRO_TELEMETRY_DISABLED = '1'
        $arguments = '--max-old-space-size=8192 "' + $astroPath + '" dev --host 127.0.0.1 --port 43201'
        $serverProcess = Start-Process -FilePath $nodePath -ArgumentList $arguments -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru
    }
    while (-not $serverProcess.HasExited) {
        $codexRunning = Test-CodexDesktop
        if ($codexRunning) { $seenCodex = $true }
        if ($seenCodex -and -not $codexRunning) { break }
        Start-Sleep -Seconds $PollSeconds
        $serverProcess.Refresh()
    }
}
finally {
    if ($ownsMutex) {
        if ($serverProcess -and -not $serverProcess.HasExited) {
            $current = Get-CimInstance Win32_Process -Filter "ProcessId = $($serverProcess.Id)" -ErrorAction SilentlyContinue
            if ($current.Name -eq 'node.exe' -and $current.CommandLine.Contains($astroPath)) {
                Stop-Process -InputObject $serverProcess -ErrorAction SilentlyContinue
            }
        }
        $mutex.ReleaseMutex()
    }
    $mutex.Dispose()
}
