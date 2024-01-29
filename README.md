# Create Node App

## Motivation

I always like to play with new tech and tools. And this is a small project to skip some configuration steps when creating a new library. What's the advantage of this ? So you can create your own template and use this tool to create a new library with your own template.

My current template is configured with

- `typescript` configured with `tsup` for bundling
- `eslint` configured with `@typescript-eslint/eslint-plugin`, `eslint-config-prettier`, `eslint-plugin-prettier` & `prettier`,
- `vitest` for testing

## Installation

```bash
git clone git@github.com:sabovyan/node-config.git
```

```bash
cd node-config
```

```bash
npm link
```

## Usage

```bash
node-setup
```

## Dependencies

- [chalk](https://github.com/chalk/chalk)

## References

- https://medium.com/@pongsatt/how-to-build-your-own-project-templates-using-node-cli-c976d3109129
- https://dev.to/0xkoji/create-a-npm-package-template-with-typescript-and-tsup-328n
- https://dev.to/mikhaelesa/create-your-own-npm-create-cli-like-create-vite-3ig7
- https://tsup.egoist.dev
- https://plusreturn.com/blog/build-better-and-faster-bundles-with-typescript-and-express-using-tsup/
- https://docs.npmjs.com/cli/v10/configuring-npm/package-json
- https://docs.npmjs.com/cli/v10/commands/npm-link
- https://docs.npmjs.com/cli/v10/commands/npm-init
