# Github profiler

This project was created by Rafael Appelt as a practical test for AE Studio.

# Architecture

The project has 3 layers separated by directories.
The webpack wraps everything in the dist folder during the build process.

### /core

The enterprise's core logic.

### /ui

This layer contains the application's business rules regarding the user interface.

### /web

The implementation of the user interface.
Web Components were used to modularize the interface components.

# Usage

## Requirments

This project requires the npm installed to build and run.

## Building

To build the application with Webpack, run the following npm script:

```bash
  npm run build
```

## Running

To run the application, use one of the following methods:

<details>
<summary><b>npm script</b></summary>
Run the npm script:

```bash
  npm run start
```

</details>

<details>
<summary><b>Manual file open</b></summary>
Open with a browser the file located on `/dist/index.html`.
</details>

<details>
<summary><b>Published website</b></summary>

Visit <http://appelt.com.br/github-profiler>

</details>
