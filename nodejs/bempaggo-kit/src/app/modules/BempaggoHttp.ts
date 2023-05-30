
class BempaggoHttp {
  private headers: Headers;
  private toUrl = (path: string) => new URL(`${this.baseUrl}${path}`);
  constructor(private baseUrl: string, token: string) {
    this.headers = new Headers();
    this.headers.set("Content-Type", "application/json");
    this.headers.set("Authorization", `Bearer ${token}`);
  }
  public httpGet(path: string): Promise<Response> {
    const url: URL = this.toUrl(path);
    return fetch(url, {
      method: "GET",
      headers: this.headers,
    });
  }
  public httpGetByLocation(location: string): Promise<Response> {
    return fetch(location, {
      method: "GET",
      headers: this.headers,
    });
  }
  public httpPut(path: string, body: unknown): Promise<Response> {
    const url: URL = this.toUrl(path);
    return fetch(url, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }
  public httpPost(path: string, body: unknown): Promise<Response> {
    const url: URL = this.toUrl(path);
    return fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
      redirect: "manual",
    });
  }

  public getUrl(): string {
    return this.baseUrl;
  }
}
export { BempaggoHttp };

