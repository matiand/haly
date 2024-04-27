# Haly.IntegrationTests.ClientApp

Integration tests for Haly.ClientApp.

Tests use **playwright**.

## Running locally

First run:

---

    npm install
    npx playwright chromium
    mkdir -p ~/.auth

---

Next create an **.env** file in the root of this project.

---

    # Use the same value that ClientApp uses.
    SPOTIFY_CLIENT_ID=

---

Finally run:

---

    npm run ui

---
