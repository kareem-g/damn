import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'config';

interface BadRequestError {
  status: number;
  data: {
    errors: {message: string; code: string}[];
  };
}
const headers: Readonly<Record<string, string | boolean>> = {
  // 'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
  ...Config.musementAPIHeaders,
  'Accept-Language': (localStorage.getItem('lang') as string) || 'en',
  // scheme: 'https',
};

const injectToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  try {
    //const { headers, method } = config;

    if (globalThis) {
      const token = globalThis.localStorage?.getItem('accessToken');
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  } catch (error) {
    throw (error as Error).message;
  }
};

class Http {
  baseURL: string;
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }
  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }
  initHttp() {
    const http = axios.create({
      baseURL: this.baseURL,

      headers,
      // withCredentials: true,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const {response} = error;
        return this.handleError(response);
      }
    );

    this.instance = http;

    return http;
  }

  request<T = unknown, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // handle generic app errors depending on the status code
  private handleError(error: BadRequestError) {
    if (!error) return;

    const {status} = error;

    switch (status) {
      case 500: {
        // error.data.errors.forEach((err) => {
        //   window.alert(err.message);
        // });
        console.log(error);
        break;
      }
      case 400: {
        console.log(error);
        // error.data.errors.forEach((err) => {
        //   window.alert(err.message);
        // });
        break;
      }
      case 401: {
        // error.data.errors.forEach((err) => {
        //   window.alert(err.message);
        // });
        console.log(error);
        break;
      }
      case 403: {
        // error.data.errors.forEach((err) => {
        //   window.alert(err.message);
        //   console.log(err);
        // });
        break;
      }
      case 405: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

const http = new Http(Config.musementAPI);
export default http;
