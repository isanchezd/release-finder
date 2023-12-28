# Release Finder

This repository contains the source code for the Release Finder web application.

This project is a web application aimed at performing advanced search operations on releases generated in GitHub git repositories.

The need for this project arises from two fundamental objectives:

1. I found a personal need to search through different releases to see if there had been any changes regarding an issue I was facing with the current version of a tool. It took me some time to perform this search, and I missed having a more advanced search tool.

2. My personal desire to tinker and try out different technologies led me to want to do something with [Svelte](https://svelte.dev/) and a bit of its ecosystem.

## Built with

- [SvelteKit](https://kit.svelte.dev/)
- [Sveltestrap](https://sveltestrap.js.org/?path=/docs/sveltestrap-overview--docs)

## Prerequisites

To install and run the project, you need to have [Node.js](https://nodejs.org/) installed.

## Installation

Once you have Node.js correctly installed, run the following command:

```bash
npm install
```

This command will install all the necessary packages to work with the repository.


## Development

After installing all the project dependencies, to start the project, run the following command:

```bash
npm run dev
```

## Building

To build for production environments, run the following command:

```bash
npm run build
```

To preview the application from the generated build, run the following command:

```bash
npm run preview
```

## Error checking

To check if there are any errors in our code, run the following command:

```bash
npm run check

# Or, if we want to watch mode

npm run check:watch
```

## Formating & linting

To check if the code complies with the defined linting rules, run the following command:

```bash
npm run lint
```

To format the code according to the defined rules, run the following command:

```bash
npm run format
```

## Testing

To execute the battery of tests, both end-to-end and unit tests, run the following command:

```bash
npm run test
```

If you want to run only unit tests:

```bash
npm run test:unit
```

If you want to run only end-to-end tests:

```bash
npm run test:e2e
```

## Contributing

If you have any suggestions on how to make this project better, please fork the repository and create a PR. Don't forget to give it a star =)

1. Fork the project
2. Create a branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a PR

## License

Distributed under the GPL3 License. See LICENSE.txt for more information.

## Contact

- isanchezd -(Iván Sánchez Díaz)[mailto:sanchez.diaz.ivan@gmail.com]

