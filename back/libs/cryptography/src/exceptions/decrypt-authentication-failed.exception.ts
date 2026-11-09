import { CryptographyBaseException } from "./cryptography-base.exception";

/**
 * Thrown when a symmetric decryption fails its authentication check
 * (invalid auth tag or a cipher shorter than the mandatory header).
 *
 * Replaces the previous generic `throw new Error("Authentication failed !")`.
 * @see https://gitlab.dev-franceconnect.fr/france-connect/fc/-/issues/138
 */
export class DecryptAuthenticationFailedException extends CryptographyBaseException {
  public error = "server_error";
  public error_description =
    "authentication aborted due to a technical error on the authorization server";

  constructor() {
    super();
    this.log = "Symmetric decryption failed its authentication check.";
  }
}
