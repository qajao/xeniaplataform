# Xenia plataform QA Engineer Test

v1.0 February 7, 2024

## Context

Hello! This is my Cypress-based test for Xenia plataform.

## Requirements

- **Node.js** (version 16.x or higher)
- **npm** (or **yarn**)

## What We Expect

- **Simple login api test**
- **Create a template test**
- **Create a task test**

## How to Set Up the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/qajao/xeniaplataform
   cd <repository-folder>
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` file**  
   In the root directory of the project, create a `.env` file and add the necessary environment variables. Example:
   ```bash
   BASE_URL='https://app.url/'
   API_URL='https://api.url/api'
   EMAIL='name@email.com'
   PASSWORD='password'
   ```

## How to Run Tests

1. **Run Cypress in interactive mode:**  
   ```bash
   npx cypress open
   ```
   This will open the Cypress Test Runner where you can manually select and run tests.

2. **Run Cypress in headless mode:**  
   ```bash
   npx cypress run
   ```

