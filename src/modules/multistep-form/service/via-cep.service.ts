import { AxiosAdapter } from "../../../infra/axios-adapter";
import { IHttpClient } from "../../../infra/http-client";
import { ViaCepResponse } from "./domain/ViaCepResponse";

class ViaCepService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAddressByCep(cep: string): Promise<ViaCepResponse> {
    return await this.httpClient.get(`${cep}/json/`);
  }
}

const httpClient: IHttpClient = new AxiosAdapter("https://viacep.com.br/ws/");
export default new ViaCepService(httpClient);
