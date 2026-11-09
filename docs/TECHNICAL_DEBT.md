# Technical debt

This list is a snapshot generated manually from the `TODO` / `FIXME` / `HACK` markers present in the code. It may drift from the code: re-generate it with the command at the bottom of this file.

> **Note on references:** the `#NNN` references point to issues of our internal GitLab instance (`gitlab.dev-franceconnect.fr`), which is not public. They are kept for traceability only. An empty Ref means the marker has no ticket.

Locations are `file:line`, relative to each package.

## back/

| Location | Ref | Description |
| --- | --- | --- |
| `apps/core-fca-low/src/main.ts:122` | #1203 | The `useStaticAssets` calls serving the DSFR assets must be removed once webpack is configured to load the assets from the `@gouvfr/dsfr` package. |
| `libs/rabbitmq/src/dto/rabbitmq.config.ts:16` | #147 | `queueOptions` is not validated (hard-coded options). |
| `libs/rabbitmq/src/dto/rabbitmq.config.ts:23` | #147 | Other available RabbitMQ options (e.g. `prefetchCount`) are not configurable yet; the commented-out code lists them. |
| `libs/common/src/helpers/dto-validation.ts:16` | #428 | Remove the NestJS `Type<>` and create an equivalent `InstanceOf<>` independent of NestJS. |
| `libs/common/src/helpers/dto-validation.ts:37` | FC-244 | `validateDto`: the transformed object is validated but not returned, so unknown properties are never stripped. Should return an object containing the result or the errors. |
| `libs/common/src/helpers/dto-validation.ts:58` | FC-244 | Same issue in `validateDtoSync`. |
| `libs/oidc-client/src/services/oidc-client.service.ts:553` | #1449 | `client_id` is temporarily removed from `endSessionUrl` because it was not provided by the previous `openid-client` version. May break logout with some identity providers; to be re-enabled. |
| `libs/app/src/dto/app-config.dto.ts:38` | #195 | Story left open: "as a dev, I check the URL prefix" (`urlPrefix` validation). |
| `libs/exceptions/src/cli/export-exceptions/markdown-generator.ts:55` | #1988 | Fix the inconsistent usage of codes and scopes across the codebase. Duplicated error codes are only logged; the `throw new Error(...)` must be restored once fixed. |
| `libs/cryptography/src/cryptography.service.ts:113` | #138 | `decrypt`: throw a specific exception instead of a generic `Error("Authentication failed !")` when the cipher is too short. |
| `libs/cryptography/src/cryptography.service.ts:135` | #138 | `decrypt`: same, when the authentication tag verification fails (`decipher.final()`). |
| `libs/oidc-provider/src/services/oidc-provider-config.service.ts:263` | | `postLogoutSuccessSource`: setting `ctx.body = ""` avoids an `ERR_HTTP_HEADERS_SENT` (500) error; the reason is not understood and should be investigated. |
| `libs/session/src/services/session-backend-storage.service.ts:112` | #415 | `serialize` should probably have a try/catch with a custom error code. |
| `libs/session/src/interceptors/session-commit.interceptor.ts:43` | #1551 | Fix route paths to avoid double execution of middlewares: some routes are contained in others (e.g. `/interaction/:uid` in `/interaction/:uid/verify`). The temporary fix (trailing `$`) makes the interceptor miss the route and not commit the session. Routes should get unambiguous names. |
| `libs/session/src/interceptors/session-commit.interceptor.ts:59` | #1429 | Remove the try/catch around `session.commit()`. Possible once SSO is allowed on all instances and the session is no longer fully detached on redirection to the service provider (or a new empty session is initialised instead). |
| `libs/session/src/dto/session.config.ts:43` | #151 | Evaluate using `keyObjects` instead of a plain string, plus key rotation. |

## admin/

| Location | Ref | Description |
| --- | --- | --- |
| `src/identity-provider/identity-provider.controller.ts:93` | | `showCreationForm`: possible refactoring to generalise the handling of TOTP failures. |
| `src/identity-provider/identity-provider.controller.ts:158` | | Same refactoring suggestion in the edit form handler. |
| `src/identity-provider/identity-provider.controller.ts:180` | | `identityProviderUpdate`: review the validation performed by the DTO. |
| `src/identity-provider/dto/identity-provider.dto.ts:37` | | Rename `jwksUrl` to `jwksUri`, to be consistent with the service-provider side and more OpenID-compliant in naming. |

## Other packages

No markers were found in `csmr-rie/`, `mock-*/` and `statisticat/`.

## How to regenerate this list

Run from the repository root:

```bash
grep -rnE "TODO|FIXME|HACK|@todo" \
  --include=*.ts --exclude=*.spec.ts --exclude=*.test.ts \
  --exclude-dir=node_modules \
  back admin csmr-rie mock-* statisticat
```

Then read the surrounding comment/code of each match to update the tables above.
