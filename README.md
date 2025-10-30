# Chapter One React Native Task App

## Overview

This is a simple React Native to-do app created for Chapter One. It lets you manage a list of tasks with an intuitive mobile interface. All data is managed locally within the app and is not persisted across restarts.

## Features

-   **Add New Task:** Enter a title and add a task; the most recent appears first.
-   **Mark as Done/Undone:** Toggle a task's status by tapping the circle.
-   **Delete Task:** Remove any task using the trash button.
-   **Smart Ordering:** Incomplete tasks are shown at the top; completed ones below.
-   **Responsive & Accessible:** Buttons provide press feedback and have accessibility labels. Empty-state message is shown if you have no tasks.

## Setup & Running Instructions

1. **Install [Node.js](https://nodejs.org/)** (if not already installed)
2. **Install Expo CLI** (if not already installed, globally):
    ```bash
    npm install -g expo-cli
    ```
3. **Install NPM Dependencies** (in the project directory):
    ```bash
    npm install
    ```
4. **Start the App:**
    ```bash
    npm start
    # or
    expo start
    ```
5. **Run on Device or Emulator:**
    - Scan the QR code with Expo Go (iOS/Android app), or
    - Press `a` for Android emulator, `i` for iOS simulator, or `w` for web (if available)

## Project Structure

-   `src/screens/Tasks.tsx`: The main app screen (home page)
-   `src/components/TaskItem.tsx`: Individual task row component
-   `src/components/AddTaskBar.tsx`: Task input bar component
-   `src/types/task.ts`: Central Task type definition

## Third-party Libraries

-   **[Expo](https://expo.dev/):** Development/build toolchain for React Native.
-   **[React Native](https://reactnative.dev/):** Main framework for building native mobile apps.
-   **react & @types/react:** Core React library (with TypeScript types for better developer experience).

**No additional third-party libraries** for tasks, sorting, or state management—the project uses only React and React Native core APIs for these features.

## Special Instructions

-   This project manages tasks only in local state (no database/file/network storage).
-   Changes are not saved if you close/restart the app.
-   For testing on a real device, install the Expo Go app from your device's app store.

---

Feel free to modify and extend this project for learning or experimentation!
