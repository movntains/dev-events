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

### Environment Variables

1. Create a `.env` file.
2. Copy the contents of the `.env.example` file into the `.env` file.
3. Add values for any variables that are blank (e.g., API keys).

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

## PostHog Setup

1. [Create a free PostHog account](https://posthog.com) if you don't have one already.
   - You'll be asked to create an organization. Set whatever organization name you want and continue.
   - Select all products to use.
   - Skip the installation for the `Install` step.
2. On your dashboard, click the project dropdown in the top left and click the settings icon next to the project name (this will be `Default project` if you're a new user).
   - If you already have an account, create a new project.
3. _(Optional)_ Set `Display name` to `DevEvents`, or whatever name you'd like to call the project.
4. Scroll down to the bottom of the `General` tab and copy your `Project API key`. Set that value as the value for `NEXT_PUBLIC_POSTHOG_KEY` in your `.env` file.
5. Use the [PostHog documentation](https://posthog.com/docs) to create insights and dashboards, turn on error tracking, etc.
