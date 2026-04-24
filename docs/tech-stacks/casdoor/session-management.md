---
title: Session Management
source: https://casdoor.org/docs/session/management
description: View and manage active sessions in Casdoor - delete individual sessions or bulk, with API support for programmatic session control.
---

# Session management

In the Casdoor admin panel, view active sessions and end them individually or in bulk. Admins and users can control which devices or browsers stay signed in.

## Viewing sessions[​](#viewing-sessions "Direct link to Viewing sessions")

1.  Open **Sessions** in the sidebar.
2.  You'll see all active sessions for the organization, with user, application, creation time, and session IDs.

Each row is one user–application pair; multiple session IDs in a row mean the user is signed in from more than one device or browser.

## Deleting a single session[​](#deleting-a-single-session "Direct link to Deleting a single session")

Ending a specific session revokes access from that device or browser only. Use this to:

-   Revoking access from a lost or stolen device
-   Terminating a suspicious login from an unfamiliar location
-   Managing sessions across multiple devices individually
-   Logging out from specific browsers while staying logged in elsewhere

### Steps[​](#steps "Direct link to Steps")

On the Sessions list, each session's IDs appear as tags. To remove one:

1.  Find the session row.
2.  Click the × on the session ID tag you want to end.
3.  Confirm in the dialog.

That session is invalidated immediately; the user is signed out on that device or browser only.

### Current session protection[​](#current-session-protection "Direct link to Current session protection")

The session you are currently using cannot be deleted. Attempting to delete it shows:

> "session id {session-id} is the current session and cannot be deleted"

Use the normal logout flow to sign out of your current session.

## Deleting all sessions[​](#deleting-all-sessions "Direct link to Deleting all sessions")

When you delete a session record entirely (not just a single session ID), Casdoor handles it intelligently:

-   If the session record has multiple session IDs, deleting one ID removes just that session
-   If only one session ID remains and you delete it, the entire session record is removed
-   Delete the entire session record with the row's delete button

## API for Session Deletion[​](#api-for-session-deletion "Direct link to API for Session Deletion")

### Delete a Specific Session ID[​](#delete-a-specific-session-id "Direct link to Delete a Specific Session ID")

```
POST /api/delete-session?sessionId={'{'}session-id{'}'}
Content-Type: application/json

{
  "owner": "organization-name",
  "name": "username",
  "application": "app-name"
}
```

### Delete All Session IDs[​](#delete-all-session-ids "Direct link to Delete All Session IDs")

```
POST /api/delete-session
Content-Type: application/json

{
  "owner": "organization-name",
  "name": "username",
  "application": "app-name"
}
```

## Session Cleanup[​](#session-cleanup "Direct link to Session Cleanup")

Casdoor automatically cleans up expired sessions based on your session timeout configuration.

## Best Practices[​](#best-practices "Direct link to Best Practices")

**Use individual session deletion for security incidents**: If you detect suspicious activity from a specific device, delete just that session ID rather than logging the user out everywhere.

**Educate users on session management**: Users should know how to view their active sessions and remove ones they don't recognize.

**Monitor session patterns**: Unusual numbers of concurrent sessions may indicate account sharing or credential compromise.

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

-   [Single Sign-Out](/docs/session/single-sign-out): Learn about SSO logout functionality
-   [Session Overview](/docs/session/overview): Understand session concepts in Casdoor
-   [Tokens](/docs/token/overview): How sessions relate to access tokens
