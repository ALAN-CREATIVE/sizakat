[![pipeline status](https://gitlab.cs.ui.ac.id/sizakat/5.0/sizakat-frontend/badges/master/pipeline.svg)](https://gitlab.cs.ui.ac.id/sizakat/5.0/sizakat-frontend/-/commits/master)
[![coverage report](https://gitlab.cs.ui.ac.id/sizakat/5.0/sizakat-frontend/badges/master/coverage.svg)](https://gitlab.cs.ui.ac.id/sizakat/5.0/sizakat-frontend/-/commits/master)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Run `npm install` or `yarn install`
2. Run `npm run dev` or `yarn dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

Here is a list of all packages/dependencies that you should be at least familiar with before contributing. However, seeing the `package.json` file is the best way to check the complete list of the dependencies.

### Core

- React
- Next
- GraphQL

### Linting

To maintain code style consistency, we use the following tools. You can see the configuration of each linter/formatter in their file located at the root folder (`.eslintrc.js`, `.prettierrc`, `.stylelintrc`).

- ESLint
- Prettier
- Stylelint

## Folder Structure

```
├── components // dummy ui components. no API calls
│   ├── Buttons
│   │   ├── Button.js
│   │   └── Button.stories.js
│   ├── Card
│   │   ├── Card.js
│   │   └── Card.stories.js
│   └── ...
├── lib
├── pages // container for modules and components. some API calls might happen here
│   ├── index.js
│   └── ...
├── public
├── src/modules // container for ui components. most API calls should happen here
│   ├── login
│   ├── forget-password
│   └── ...
└── styles
    └── global.css
```

### `components/`

The `components/` folder should only contain stateless components along with their Storybook stories. Your pages may import components from this folder.

### `lib/`

The `lib/` folder should contain any independent logic files or utility functions, which are intended to be reused by other files such as components or pages.

### `pages/`

The `pages/` folder contains files that are associated with a route based on their file name. See more details [here](https://nextjs.org/docs/basic-features/pages).

### `public/`

The public folder contains your assets such as images, fonts, and favicon. You may place `robots.txt` here if needed.

### `styles/`

The `styles` folder contains `global.css` that should be used as a global styling across pages. You may override or style your specific component with isolated CSS in its own file/folder instead.

## Workflows

To help provide some guidance for contributing to the repository, here is a list of common cases that you may meet.

### Add or update a component

Coming soon

<!-- TODO: Write steps for adding or updating a component using Storybook -->

### Add a feature or module

Coming soon

<!-- TODO: Write steps for adding a feature -->

### Update an existing feature

1. Apply your changes to any files that are the building blocks of the feature
2. Update related feature test suites
3. Run the test to ensure the functionality works as expected
4. Lint your files before committing to git
5. Document your reason for changes
