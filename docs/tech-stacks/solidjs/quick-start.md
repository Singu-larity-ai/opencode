---
title: Quick start
source: https://docs.solidjs.com/quick-start
description: Get started with Solid by creating your first project using npm, pnpm, yarn, bun, or deno.
---

# Quick start

To experiment with Solid directly in your browser, head over to our interactive playground. Prefer a full development setup? You can set up a complete environment using StackBlitz.

## Create a Solid project

Prerequisites:
- Familiarity with the command line.
- A recent version of Node.js, Bun, or Deno. The latest LTS version is recommended.

To create a new Solid application, navigate to the directory where you want to create your project and run the following command:

```bash
npm init solid
# or
pnpm create solid
# or
yarn create solid
# or
bun create solid
# or
deno init --npm solid
```

This command installs and runs create-solid, the official project scaffolding tool for Solid. The CLI will guide you through a series of prompts, allowing you to choose options such as starter templates, TypeScript support, and whether to include Solid's full-stack framework, SolidStart.

Once the project is created, follow the instructions to install the dependencies and start the development server:

```bash
cd solid-project
npm install
npm run dev
```
