# DevTools Panel Extension

## Overview

This project is a Chrome DevTools Extension designed using React and TypeScript. The extension provides a custom panel in the DevTools interface and demonstrates the usage of components, state management, and interaction with Chrome extension APIs.

## Project Structure

- **src/**: This folder contains the source code of the extension.
  - **devtools/**: The DevTools-specific components, including the main entry point.
  - **panel/**: Contains the main panel-related components and logic.
  - **components/**: General reusable components used within the extension.
  - **styles/**: CSS files for styling components.
  - **utils/**: Utility functions and classes to interact with cookies and session data.
  - **types/**: TypeScript type definitions used in the project.

- **dist/**: The distribution folder where the built extension files are output.

- **public/**: Any static files, including the `manifest.json`, which declares the extension's settings.

- **package.json**: Contains scripts and dependencies needed for the project.

## Prerequisites

Ensure you have Node.js and npm installed on your system. You can download them from [Node.js official website](https://nodejs.org/).

## Setup

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:sawyerit/DevToolsPanel.git
   cd devtoolspanel
   ```

2. **Install Dependencies:**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Build the Project:**

   Use the command below to build the project using Webpack:

   ```bash
   npm run build
   ```

   The build artifacts will be produced in the `dist/` directory.

4. **Load the Extension in Chrome:**

   - Open Chrome and type `chrome://extensions` in the address bar.
   - Enable "Developer mode" using the toggle in the top-right corner.
   - Click "Load unpacked" and select the `dist/` directory (or drag and drop the dist folder onto the page).

## Development

To start the development server with live reloading, use:

```bash
npm run watch
```

This will watch for changes and rebuild the project automatically, in the browser close and reopen the dev tools panel (cmd-option-i on mac)

## Features

- **React Components**: Utilizes React for building user interfaces with components such as `Panel`, `Tabs`, and `SettingsPanel`.
- **State Management**: Manages state within components using React Hooks like `useState` and `useEffect`.
- **Chrome API Interaction**: Uses the Chrome Extension API to manage cookies and interact with DevTools interfaces.
- **TypeScript**: Type safety with TypeScript to ensure robust code with defined interfaces and types.

## Scripts

- **`npm run build`**: Compiles the TypeScript and bundles the React application for production use.
- **`npm run watch`**: Starts webpack in watch mode, recompiling on changes for development.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.