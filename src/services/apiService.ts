import { REACT_NATIVE_API_BASE_URL_DEVELOPMENT, REACT_NATIVE_API_BASE_URL_PRODUCTION } from '@env';

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

  private async handleResponse<T>(response: Response): Promise<T> {
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = Array.isArray(responseData) && responseData.length > 0
        ? responseData.map((error: any) => error.message).join(', ')
        : `Erro na requisição: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return responseData as T;
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options = this.getRequestOptions(method, data);

    try {
      const response = await fetch(url, options);
      return await this.handleResponse<T>(response);
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

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }
}
