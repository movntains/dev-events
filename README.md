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

### API Endpoints

The `endpoints` directory includes YAML files for API endpoint testing. They can be opened with [Yaak](https://yaak.app), a free API client that enables syncing workspace data to the local filesystem.

In the app, you can choose to open an existing workspace and select the `endpoints` directory when doing so. This will load the workspace and all of the requests within it.

If any local changes are made to the existing requests, or if new requests are added, those changes will be automatically tracked by Git and can be discarded or committed as needed.

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

## MongoDB Setup

1. [Create a free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) if you don't have one already.
2. Create a new project.
3. Create a cluster.
   - Choose the free tier.
   - Select the region that's closest to you.
   - Click `Create Deployment`.
4. Click `Create Database User`.
5. Click `Choose a connection method`.
6. Click `Drivers` under `Connect to your application`.
7. Wait for the cluster to finish provisioning, and then copy the connection string. Set it as the value for the `MONGODB_URI` variable in your `.env` file.
8. In the side navigation, click `Database and Network Access` underneath `Security`.
   - Click on `IP Access List`.
   - Click `Add IP Address`.
   - Click `Allow Access from Anywhere` and click `Confirm`.
     - This is necessary for connecting after deployment.

## Cloudinary Setup

1. [Create a free Cloudinary account](https://cloudinary.com) if you don't have one already.
   - Go through the onboarding if you've just created an account.
2. Click on the settings icon in the side navigation.
3. Click on `Upload`, then click on `Add Upload Preset`.
   - Provide any preset name you'd like.
   - Set `Signing mode` as `Unsigned`.
   - Set `Folder` to `events`.
   - Click `Save`.
4. Click on `API Keys` in the navigation.
   - Copy the `CLOUDINARY_URL` value in the `API environment variable` section and paste it as the value for the `CLOUDINARY_URL` environment variable in your `.env` file.
   - Click `Generate New API Key`. Enter the confirmation code sent to your email.
   - Copy the `API Key` value shown in the table and replace `<your_api_key>` in your `CLOUDINARY_URL` value with the key you just copied.
   - Copy the `API Secret` value shown in the table and replace `<your_api_secret>` in your `CLOUDINARY_URL` with the secret you just copied.
   - _(Optional)_ You can rename your API key to something more specific, rather than leaving the default key name of `Untitled`.
