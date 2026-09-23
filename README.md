# Wavetek PX2 Chrome/Edge Extension POC

This Manifest V3 extension is a safe starting point for proving communication between a browser extension and a PX2 connected over Ethernet.

## Project status

The browser-extension shell and mock demonstration are complete. Real PX2 authentication and setting endpoints must be captured from the device WebUI before the hardware integration can be verified.

## Current scope

- Mock mode for demonstrating the flow without hardware
- Runtime permission request for the configured PX2 host
- HTTP Basic, form/session, or no-auth modes
- Configurable connection, login, read, and write endpoints
- JSON or URL-encoded setting updates
- Connection, timeout, HTTP, and permission error feedback
- Credentials are kept in popup memory only and are never persisted

The endpoint defaults are placeholders. The PX2 manual documents the WebUI, but not its private HTTP request contract. A real-device test is required before claiming integration is complete.

## Install locally

1. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this `wavetek-px2-poc` folder.
5. Open the extension and leave **Mock mode** enabled for a demo.

## Real PX2 discovery procedure

1. Connect the computer and PX2 by Ethernet and confirm that the PX2 WebUI opens.
2. In the WebUI, open DevTools > Network and enable **Preserve log**.
3. Log in, read a harmless setting, and change that setting.
4. Record each request's URL, method, content type, payload, cookies/authorization, response, and any CSRF token.
5. Configure the discovered paths in the extension and disable Mock mode.
6. Test connection, read, then write. Use a non-critical setting first.

If the PX2 uses a challenge/response scheme, dynamically named form fields, CSRF tokens, or a proprietary RPC payload, update `loginIfNeeded`, `readSetting`, and `writeSetting` in `popup.js` to match the captured requests.

## Acceptance criteria

- The extension can reach the PX2 at its local address.
- It can authenticate without persisting the password.
- It can read one agreed setting.
- It can change that setting and the PX2 WebUI confirms the new value.
- Errors are shown clearly and Chrome and Edge both pass the test.

## Push this repository to GitHub

Create an empty GitHub repository named `wavetek-px2-extension`, then run:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/wavetek-px2-extension.git
git push -u origin main
```

Do not commit PX2 passwords, exported HAR files, session cookies, or other credentials.
