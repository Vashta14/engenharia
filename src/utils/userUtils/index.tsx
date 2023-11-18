export class CurrentUser {
  public static set(data: User): void {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }

  public static get(): User {
    const sessionData = localStorage.getItem("currentUser");
    return sessionData ? JSON.parse(sessionData) : undefined;
  }

  public static clear(): void {
    localStorage.removeItem("currentUser");
  }
}
