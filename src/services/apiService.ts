import axios, { AxiosResponse, AxiosError, Method } from 'axios';
import { REACT_NATIVE_API_BASE_URL_DEVELOPMENT, REACT_NATIVE_API_BASE_URL_PRODUCTION } from '@env';

interface ApiErrorData {
  code: number;
  date: string;
  details: any;
  message: string;
  severity: string;
  status: string;
  time: string;
}

export class ApiService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = __DEV__ 
      ? REACT_NATIVE_API_BASE_URL_DEVELOPMENT 
      : REACT_NATIVE_API_BASE_URL_PRODUCTION;

    if (!this.baseUrl) {
      throw new Error(`Variável de ambiente ${__DEV__ ? 'REACT_NATIVE_API_BASE_URL_DEVELOPMENT' : 'REACT_NATIVE_API_BASE_URL_PRODUCTION'} não definida`);
    }
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleApiError(error: AxiosError<ApiErrorData>): never {
    const errorMessage = error.response?.data?.message ?? error.message;
    const status = error.response?.status;

    let errorDescription: string;
    switch (status) {
      case 400:
        errorDescription = 'Erro de cliente ao comunicar com a API';
        break;
      case 401:
        errorDescription = 'Erro de autorização ao comunicar com a API';
        break;
      case 500:
        errorDescription = 'Erro interno no servidor ao comunicar com a API';
        break;
      default:
        errorDescription = 'Erro desconhecido ao comunicar com a API';
    }

    throw new Error(`${errorDescription}: ${errorMessage}`);
  }

  private async request<T>(method: Method, endpoint: string, data?: any): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await axios({ method, url, data });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleApiError(error as AxiosError<ApiErrorData>);
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request('get', endpoint);
  }

  public post<T>(endpoint: string, data: any): Promise<T> {
    return this.request('post', endpoint, data);
  }

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request('put', endpoint, data);
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request('delete', endpoint);
  }
}
