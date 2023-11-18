import { AxiosResponseHeaders } from "axios";

export class AuthTokens {
  static getAccessToken(): string | null {
    return `${localStorage.getItem("access-token")}`;
  }

  static getClient(): string | null {
    return `${localStorage.getItem("client")}`;
  }

  static getExpirity(): string | null {
    return `${localStorage.getItem("expirity")}`;
  }

  static getUid(): string | null {
    return `${localStorage.getItem("uid")}`;
  }

  static setTokensByHeader(header: AxiosResponseHeaders): void {
    localStorage.setItem("access-token", header["access-token"]);
    localStorage.setItem("client", header.client);
    localStorage.setItem("expirity", header.expiry);
    localStorage.setItem("uid", header.uid);
  }

  static tokensExist(): boolean {
    return (
      this.getAccessToken() !== "null" &&
      this.getClient() !== "null" &&
      this.getExpirity() !== "null" &&
      this.getUid() !== "null"
    );
  }

  static cleanTokens(): void {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expirity");
    localStorage.removeItem("uid");
    window.location.replace("/login");
  }
}
