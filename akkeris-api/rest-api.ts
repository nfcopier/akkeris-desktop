import * as https from "https";

export default class RestApi {

    private readonly hostname: string;
    private readonly token: string;

    public constructor(hostname: string, token: string) {
        this.hostname = hostname;
        this.token = token;
    }

    public get(endpoint: string): Promise<any> {
        const url = `${this.hostname}/${endpoint}`;
        const options = {headers: {"Authorization": `Bearer ${this.token}`}};
        return new Promise<any>(this.executeGet(url, options));
    }

    private executeGet(url: string, options: {}) {
        return (resolve: (value: any) => void, reject: (reason?: any) => void) => {
            https.get(url, options, res => {
                if (res.statusCode === 401) throw new Error("Unauthorized");
                const chunks = [] as String[];
                res.setEncoding("utf8");
                res.on("data", (chunk) => chunks.push(chunk));
                res.on("end", () => resolve(JSON.parse(chunks.join(""))));
                res.on("error", reject);
            });
        };
    }
}
