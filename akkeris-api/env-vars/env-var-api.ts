import RestApi from "../rest-api";
import EnvVar from "./env-var";
import EnvVarNote from "./env-var-note";

export default class EnvVarApi {

    private readonly restApi: RestApi;

    public constructor(akkerisHost: string, token: string) {
        this.restApi = new RestApi(akkerisHost, token);
    }

    public async getVarsFor(appName: string): Promise<EnvVar[]> {
        const config = await this.restApi.get(`apps/${appName}/config-vars`);
        return Object.entries(config).map(EnvVarApi.toConfigVar);
    }

    private static toConfigVar([rawKey, rawValue]: [string, string]): EnvVar {
        const key = EnvVarApi.removeNonPrintable(rawKey);
        const value = EnvVarApi.removeNonPrintable(rawValue);
        return {key, value};
    };

    private static removeNonPrintable(str: string): string {
        return str.replace(/\s/g, "").replace(/[^\x20-\x7E]/g, "");
    }

    public getNotesFor(appName: string): Promise<EnvVarNote[]> {
        return this.restApi.get(`apps/${appName}/config-vars/notes`);
    }
}
