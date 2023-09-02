import { AxiosAdapter } from "../../../infra/axios-adapter";
import { IHttpClient } from "../../../infra/http-client";
import { UserData } from "../entities/UserData.entity";
import { RestTestResponse } from "./domain/RestTestResponse";

class RestTestService {
  constructor(private readonly httpClient: IHttpClient) {}

  async sendFormData(data: UserData): Promise<RestTestResponse> {
    return await this.httpClient.post("post", data);
  }
}

const httpClient: IHttpClient = new AxiosAdapter("https://httpbin.org/");
export default new RestTestService(httpClient);
