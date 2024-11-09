import { REACT_NATIVE_API_BASE_URL_DEVELOPMENT, REACT_NATIVE_API_BASE_URL_PRODUCTION, REACT_NATIVE_API_BASE_URL_QA } from '@env';
import Constants from 'expo-constants';
import axios from 'axios';

export class ApiService {
  private readonly baseUrl: string;

  constructor() {
    const env = Constants.manifest?.extra?.apiBaseUrl || {};
    const currentEnv = process.env.ENV_FILE || '.env.production';

    switch (currentEnv) {
      case '.env.development':
        this.baseUrl = REACT_NATIVE_API_BASE_URL_DEVELOPMENT || "http://10.0.2.2:8082/mover/api";
        break;
      case '.env.qa':
        this.baseUrl = REACT_NATIVE_API_BASE_URL_QA || "https://carlo4284.c44.integrator.host/mover/api";
        break;
      default:
        this.baseUrl = REACT_NATIVE_API_BASE_URL_PRODUCTION || env.production || "http://10.0.2.2:8082/mover/api";
        break;
    }

    if (!this.baseUrl) {
      throw new Error(`Variável de ambiente não definida`);
    }
  }

  private getRequestOptions(method: string, data?: any): RequestInit {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  private async handleJsonResponse<T>(response: Response): Promise<T> {
    const responseData = await response.text();
    try {
        const jsonData = JSON.parse(responseData);
        if (!response.ok) {
            const errorMessage = Array.isArray(jsonData) && jsonData.length > 0
                ? jsonData.map((error: any) => error.message).join(', ')
                : `Erro na requisição: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return jsonData as T;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
  }

  private async handleAxiosResponse<T>(response: any): Promise<T> {
    const responseData = response.data;
    if (response.status >= 200 && response.status < 300) {
      return responseData as T;
    }

    let errorMessage = 'Erro desconhecido';
    if (responseData) {
      if (Array.isArray(responseData) && responseData.length > 0) {
        errorMessage = responseData.map((error: any) => error.message).join(', ');
      } else if (responseData.message) {
        errorMessage = responseData.message;
      }
    }
    throw new Error(`Erro na requisição: ${response.status} - ${errorMessage}`);
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options = this.getRequestOptions(method, data);

    try {
      const response = await fetch(url, options);
      return await this.handleJsonResponse<T>(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error(errorMessage);
    }
  }

  private async requestWithFileUpload<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { 'Content-Type': 'multipart/form-data' };

    const options: any = {
      method,
      url,
      headers,
    };

    if (data) {
      options.data = data;
    }

    try {
      const response = await axios(options);
      return await this.handleAxiosResponse<T>(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error(errorMessage);
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint);
  }

  public post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  }

  public postWithFile<T>(endpoint: string, data: FormData): Promise<T> {
    return this.requestWithFileUpload<T>('POST', endpoint, data);
  }

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }
}
