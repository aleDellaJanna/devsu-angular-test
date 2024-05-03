# DevsuAngularTechnicalTest

 This Angular application corresponds to the technical test for DEVSU.
 
 It is fully reactive and built using only Angular's core features, without relying on any external libraries. The application leverages Angular's reactive programming capabilities, utilizing signals and RxJS for managing state and handling asynchronous operations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Running Tests](#running-tests)
- [Viewing Test Coverage Report](#viewing-test-coverage-report)

---
## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- Angular CLI installed globally (`npm install -g @angular/cli`).


#### Note: 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

---
## Getting Started

### Clone the Repository

To clone the repository to your local machine, navigate to the directory where you want to store the project and run the following command:

```bash
git clone https://github.com/aleDellaJanna/devsu-angular-test.git
```

### Installation

To install the dependencies, run the following command inside the repository folder:

```bash
npm install 
```

### Running the App
```base
ng serve
```
or to open in a new browser tab automatically
```base
ng serve -o
```

## Running Tests

To run tests with coverage, use the following command `ng test`.
This command will execute the unit tests and generate a coverage report.

## Viewing Test Coverage Report
1. Open the generated coverage report:
```bash
open coverage/lcov-report/index.html
```
Replace open with the appropriate command based on your operating system (e.g., xdg-open for Linux, start for Windows).

This will open the coverage report in your default web browser, allowing you to analyze the code coverage metrics.
