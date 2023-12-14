# README

Versions used:

> `npm -v` -> 9.6.2
> `node -v` -> v16.19.1

Commands to use:

> `npm run preview`: Start the preview server.
> `npm run test:unit`: Run unit tests.
> `npm run dev`: Start the development server.

## Framework

I used Vue, as requested

## State management

I decided to use Vue-Query, since it makes handling remote server state fairly simple, and offers convenient caching out-of-the-box. It was probably not necessary for this simple app, but I like it.

I like Pinia for state-management, but in this application I didn't have any real global state to keep track of, so I didn't use a state-manager. I used a simple `ref` to track local actions.

## Styling

I used SCSS, with a combination of `main.scss` and component level `<style scoped>` blocks. I don't have a very strong preference for one over the other; CSS should be defined wherever it makes sense to the developer.

## Code formatter

I used Prettier to format my code as I worked. Sensible defaults, again, which reduces the number of decisions a dev has to make.

## TypeScript

I used TypeScript, because I enjoy finding out about typos early :)

## Folder structure:

- `src/`: Define `App.vue` and `main.ts`, which set up the basic framework.
- `src/views/`: Define components for each view.
- `src/components/`: Define fairly dumb presentational components. These components receive props and emit emits as needed.
- `src/utils/`: Define general utility functions. Not used in this project.
- `src/services/`: Define utilities to facilitate access to the API, and to transform data into more useful formats.
- `scr/assets`: Define styles.
