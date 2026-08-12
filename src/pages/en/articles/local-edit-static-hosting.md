---
layout: ../../../layouts/ArticleLayout.astro
title: Edit locally, host statically
description: The first-stage structure, publishing workflow, and domain split for this personal site.
date: 2026.08.12
status: Draft
locale: en
---

This site uses the local computer only as an editing environment. After an article or page is updated, the code is pushed to GitHub and the hosting platform builds the static site from the repository. The site remains available when the computer is off.

## What the first stage needs to solve

The first stage has four jobs: publish solutions and articles, present tools, direct visitors to the relevant GitHub repositories, and reserve a place for future Skill downloads. It does not need accounts, a database, or an online editor yet.

A static site fits this scope. Once built, it consists of HTML, CSS, JavaScript, and images. That keeps operating costs low and reduces the number of server components that need long-term maintenance.

## Where the content lives

Article content and page code are stored in the GitHub repository. Tool source code stays in its own project repository. Downloadable Skills, archives, and templates use GitHub Releases so each file can have a version and update history.

The website acts as an index and reading surface. It does not duplicate source code that would be difficult to keep in sync, and it does not expose the home NAS as a public download server.

## How the domains are separated

The personal site uses the root domain. The NAS keeps a separate remote-access subdomain, and the two do not share a deployment environment. Once the static host provides a stable production address, the root DNS record can be updated and HTTPS verified.

## Next step

Finish the homepage and content templates first, then create the GitHub repository and run a preview deployment. The root domain should only be switched after the preview has been checked, so DNS changes never point to an unfinished site.
