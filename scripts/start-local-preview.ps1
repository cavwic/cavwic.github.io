$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$npm = (Get-Command npm.cmd -ErrorAction Stop).Source

Set-Location -LiteralPath $projectRoot
$env:ASTRO_TELEMETRY_DISABLED = "1"

& $npm run dev -- --host 127.0.0.1 --port 43201
