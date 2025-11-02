<div aria-hidden="true" style="width: 100%; height: 100px; background-color: oklch(87.2% 0.01 258.338); display: flex; align-items: center; justify-content: center; gap: 1rem;">
  <img src="public/icons/logo.svg" style="height: 80%;" alt="" />
  <span style="color: oklch(13% 0.028 261.692); font-size: 2rem; font-weight: 600">DevEvents</span>
</div>

# DevEvents

> _DevEvents_ is a web application for browsing, creating, and managing events (e.g., hackathons, meetups, conferences) related to software development.

## Project Status

|                                                                                   Build                                                                                   |                                                               Tests                                                                |                                                            Coverage                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
| ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/movntains/dev-events/develop.yaml?branch=develop&style=for-the-badge&logo=github) | ![GitHub Branch Check Runs](https://img.shields.io/github/check-runs/movntains/dev-events/develop?style=for-the-badge&logo=github) | ![Code Coverage](https://img.shields.io/codecov/c/github/movntains/dev-events?style=for-the-badge&logo=codecov&logoColor=white) |

## Tech Stack

- Next.js version 16
- MongoDB
- Cloudinary
- PostHog
- Tailwind CSS
- Bun
- Biome
- Vitest
- React Testing Library
- GitHub Actions

## Local Development

### Package Manager

This project uses [Bun](https://bun.sh) as a package manager, so you'll need to install that if you don't already have it installed. Using another package manager (e.g., npm, yarn) would result in creating another lockfile for dependencies, which could result in conflicts and is therefore not recommended.

### Installing Dependencies

Install project dependencies with the following command.

```shell
$ bun install
```

### Running the Development Server

To run the development server, run the following command.

```shell
$ bun run dev
```

This will start a development server at [http://localhost:3000](http://localhost:3000).

## Tests

### Coverage

Test coverage is created by Vitest and sent to [Codecov](https://about.codecov.io/) via a GitHub action. This is the source of the `Coverage` badge in the [Project Status](#project-status) section.

### Running Tests Locally

To run tests locally with Vitest, run the following command.

```shell
$ bun run test
```
