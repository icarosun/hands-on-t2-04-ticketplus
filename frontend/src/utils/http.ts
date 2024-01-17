import axios, { AxiosInstance } from "../../node_modules/axios/index";

export const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": false,
  "X-Requested-With": "XMLHttpRequest",
};

class Http {
  private instance: AxiosInstance | null = null;

  public get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const PORT_BACK =  import.meta.env.PORT_BACK;
    const apiUrl = `http://localhost:${PORT_BACK}`;
    console.log(apiUrl);
    const http = axios.create({
      baseURL: apiUrl,
      headers,
      withCredentials: false,
    });

    this.instance = http;
    return http;
  }
}

export const HttpInstance = new Http();