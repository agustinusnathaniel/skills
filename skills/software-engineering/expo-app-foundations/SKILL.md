---
name: expo-app-foundations
description: >
  Build or change the foundations of an Expo or React Native app. Use when
  setting up environments, release channels, or over-the-air updates; adding
  remote config, forced updates, or feature flags; handling token refresh, push
  notifications, or deep links; embedding web views; or adding native
  modules, config plugins, or permissions.
---

# Expo App Foundations

A shipped binary lives for months and cannot be patched quickly. Build the
app so most incidents are handled remotely, and test the paths a simulator
in the foreground never exercises: cold starts, killed apps, signed-out users,
and flaky networks.

For Expo's own APIs (EAS Update, SDK upgrades, Expo Router, data fetching),
load Expo's official skills when available; this skill covers the
foundation decisions they leave to the app.

## Separate environments from channels

- Select the environment with one explicit variable per build, and turn off
  implicit `.env` loading so a stray file cannot switch it. Validate client
  and build-time variables with a schema.
- Treat the release channel and the environment as separate names: a beta
  channel may run the production environment.
- Give each environment its own app identifier and storage namespace, so a
  staging build cannot read a production session on the same device.

## Match over-the-air updates to binaries (Expo/EAS)

- An update reaches only builds with a matching runtime version. Bump the
  runtime version whenever native code or native config changes.
- Build-time and update-time configuration come from different places unless
  pinned together. With EAS, point the build profile's `environment` and the
  update's `--environment` at the same EAS environment.
- The remotely controlled minimum supported version below is the escape
  hatch for binaries an update can no longer reach.

## Ship escape hatches first

Before the first release, make the minimum supported version remotely
controllable, so an old binary can be forced to update. Serve feature flags,
API endpoints, and links remotely too only when that channel is secured
(authenticated or signed), since whoever controls it controls the app. Give
every key a typed default so a missing key fails safe, and fail open when
remote config is unreachable; a launch must never block on it.

## Refresh tokens once

Where the device clock can be trusted, refresh shortly before expiry. Always
handle a 401 too, with a single refresh in flight that waiting requests
share. Make the refresh call bypass the interceptor that triggers it. Web
views and screens that carry the token subscribe to refreshes and reload with
the new one.

## Route notifications and deep links from any state

- On cold start, hold the target until the navigator is ready.
- When the user is signed out, stash the target and replay it after login.
- Handle foreground receipt and the user's tap as separate events.
- Refresh the push token on launch, after checking for a physical device and
  notification permission.

## Contain web views

Decide which hosts stay in the app and which open externally. Classify load
errors as offline, retryable, or fatal, retry with capped exponential backoff,
and show a retry action. A token in a web view URL is a credential: rebuild
the URL when the token changes and keep it out of logs. Handle the Android
back button inside the web view's history.

## Check capabilities in three states

Biometrics, notification permission, and similar checks resolve
asynchronously. Model them as loading, available, or unavailable; reading
"not yet known" as "unavailable" disables the feature on launch.

## Audit native changes

- After adding a library or config plugin, diff the merged Android manifest
  and iOS `Info.plist` permissions, and remove ones the app does not need.
- Block screen capture per screen, on screens that show secrets, unless a
  policy requires it app-wide.
- Client-side root and jailbreak detection can be bypassed; gate sensitive
  operations on server-side attestation.
- Native config changes need a clean prebuild and a new binary. Toggling a
  capability such as push invalidates iOS provisioning profiles.

## Verify on release builds

Done when each changed path works in a release build of each environment:
cold start from a notification while signed out, a web view in airplane mode,
an expired token mid-session, and a forced update with remote config both
reachable and unreachable.
