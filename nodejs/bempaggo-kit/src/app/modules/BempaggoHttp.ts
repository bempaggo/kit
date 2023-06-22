import fetch, { Headers } from "node-fetch";

class BempaggoHttp {
	private toUrl = (path: string) => new URL(`${this.baseUrl}${path}`);
	private headers: Headers;
	constructor(private baseUrl: string, token: string) {
		this.headers = new Headers();
		this.headers.set("Content-Type", "application/json");
		this.headers.set("Authorization", `Bearer ${token}`);
	}
	public httpGet(path: string): Promise<Response> {
		const url: URL = this.toUrl(path);
		const response = fetch(url, {
			method: "GET",
			headers: this.headers,
		});
		return new Promise(as => response)

	}
	public httpGetByLocation(location: string): Promise<Response> {
		const response = fetch(location, {
			method: "GET",
			headers: this.headers,
		});
		return new Promise(as => response)
	}
	public httpGetBy(path: string, query: { name: string, value: any }[]): Promise<Response> {
		const url: URL = this.toUrl(path);
		for (const { name, value } of query) {
			url.searchParams.set(name, value);
		}
		const response = fetch(url, {
			method: "GET",
			headers: this.headers,
		});
		return new Promise(as => response)
	}
	public httpPut(path: string, body: unknown): Promise<Response> {
		const url: URL = this.toUrl(path);
		const response = fetch(url, {
			method: "PUT",
			headers: this.headers,
			body: JSON.stringify(body),
		});
		return new Promise(as => response)
	}
	public httpPost(path: string, body: unknown): Promise<Response> {
		const url: URL = this.toUrl(path);
		const response = fetch(url, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(body),
			redirect: "manual",
		});
		return new Promise(as => response)
	}

	public getUrl(): string {
		return this.baseUrl;
	}
}
export { BempaggoHttp };

