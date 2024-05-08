[![npm downloads](https://img.shields.io/npm/dt/@joeyroeters/firebase-oauth2-bride.svg)](https://www.npmjs.com/package/@joeyroeters/firebase-oauth2-bride)

# Firebase Oauth2 Bride

Firebase Oauth2 Bride is a development tool engineered to facilitate the integration of Firebase authentication within systems that traditionally support only OAuth2 protocols. This tool is particularly useful for environments like JetBrains IDEs (such as Rider, WebStorm, IntelliJ), which do not directly support Firebase Auth. Firebase Oauth2 Bride acts as a middle-man server that authenticates with Firebase using the "email + password" method and then formats the Firebase Auth token to match the expected OAuth2 standards.

## Problem Statement

Developers using JetBrains IDEs encounter significant hurdles when attempting to use Firebase for authentication. The IDEs' built-in HTTP clients support OAuth2 but not Firebase Auth directly, which can lead to workflow inefficiencies. Specifically, when trying to authenticate using Google's OAuth2 methods, developers face an error stating "this browser or app may not be secure" because of security restrictions on the embedded JetBrains browser (JCEF). Furthermore, Firebase Auth's token structure does not align with the OAuth2 expected format, complicating direct integration.

## Solution

Firebase Oauth2 Bride solves these issues by serving as a local intermediary that handles Firebase authentication requests. It accepts credentials via a simple API, authenticates with Firebase, and returns the credentials in an OAuth2-compliant format. This setup allows developers to use their existing tools and workflows without the need for complex adaptations or manual token handling.

## Key Features

- **Middle-Man Authentication**: Handles the authentication by receiving credentials, logging into Firebase, and returning the tokens in the OAuth2 format.
- **Supports "Email + Password" Authentication**: Specifically designed to work with the Firebase "email + password" authentication method.
- **Streamlines Development Workflow**: Eliminates the need for manual token copying or regeneration by automating the token acquisition and formatting process, saving developers significant time and reducing the risk of errors.
- **Easy Integration with JetBrains HTTP Client**: Configured to easily integrate with the HTTP client in JetBrains IDEs, allowing for seamless development and testing within these popular development environments.

## Installation and Usage

### As a Dev Dependency

For projects specifically requiring Firebase Oauth2 Bride:

1. **Install the Package**:
   ```bash
   npm install @joeyroeters/firebase-oauth2-bride
   ```
2. **Configure Google Service Account**:
    - Create and place your Google Service Account JSON file in a desired project location.
3. **Start the Server**:
   ```bash
   npm run start --prefix node_modules/@joeyroeters/firebase-oauth2-bride -- --config {{path to google service account}}
   ```
    - Optionally, use the `--port` option to specify a custom port if necessary (default is `3000`).

### As an Independent Installation

For environments needing a more generalized setup:

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:JoeyRoeters/firebase-oauth2-bride.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Google Service Account**:
    - Copy and fill out `config/google-service-account.json.example` with your Firebase project details.
4. **Start the Server**:
   ```bash
   npm run start
   ```
    - Adjust the port using `--port` (default is `3000`).
    - Specify a different Google Service Account file with `--config`.

## Configuring JetBrains HTTP Client

To set up the JetBrains HTTP client to use Firebase Oauth2 Bride, create a new environment in the client settings with the following configuration:

```json
{
  "dev-api": {
    "Security": {
      "Auth": {
        "FirebaseAuth": 
        {
          "Type": "OAuth2", 
          "Grant Type": "Password",
          "Client ID": "notApplicable",
          "Token URL": "http://localhost:{{port|3000=default}}/token",
          "Username": "{{firebase-email}}",
          "Password": "{{firebase-password}}"
        }
      }
    }
  }
}
```
Replace `{{port}}`, `{{firebase-email}}`, and `{{firebase-password}}` with your actual data.

## License

Usage of this software is subject to the terms and conditions as defined in the [LICENSE.txt](LICENSE.txt) file.

Note: This software is not free for redistribution or resale.
