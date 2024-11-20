import { Client } from '@dtos/Client';
import { ApiService } from '@services/apiService';

type CustomFile = {
  uri: string;
  name: string;
  type: string;
  lastModified?: number;
  size?: number;
  webkitRelativePath?: string;
};

export default class ClientService extends ApiService {

  constructor() {
    super();
  }

  public async checkExistingCpf(cpf: string): Promise<any> {
    try {
      const endpoint = `/clients/existing-cpf/${cpf}`;
      return await this.get<any>(endpoint);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async sendSecurityCode(clientId: number, email: string): Promise<any> {
    try {
      const modifiedEmail = this.formatEmail(email);
      const endpoint = `/sender/send-security-code/${clientId}/${modifiedEmail}`;
      return await this.post<any>(endpoint, {});
    } catch (error) {
      this.handleError(error);
    }
  }

  public async validateSecurityCode(clientId: number, email: string, code: string): Promise<any> {
    try {
      const modifiedEmail = this.formatEmail(email);
      const endpoint = `/sender/validate-security-code/${clientId}/${modifiedEmail}/${code}`;
      return await this.post<any>(endpoint, {});
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateClient(clientId: number, clientRequest: Client & { password: string; confirmPassword: string }): Promise<any> {
    try {
      const endpoint = `/clients/${clientId}`;
      return await this.put<any>(endpoint, clientRequest);

    } catch (error) {
      this.handleError(error);
    }
  }

  public async getContractByClientId(clientId: number): Promise<any | null> {
    try {
      const endpoint = `/contracts/contract-by/${clientId}`;
      const response = await this.get<any>(endpoint);

      return response;
    } catch (error) {
      console.log('Erro ao buscar contrato:', error);
      this.handleError(error);
      return null;
    }
  }

  public async login(cpf: string, password: string): Promise<any> {
    try {
      const endpoint = `/users/login/${cpf}/${password}`;
      return await this.get<any>(endpoint);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async startInspection(inspectionId: number, photos: CustomFile[]): Promise<any> {
    try {
      const endpoint = `/inspections/${inspectionId}/start`;
      const formData = new FormData();

      photos.forEach((photo, index) => {
        formData.append('photos', {
          uri: photo.uri,
          type: photo.type,
          name: photo.name,
        } as any);
      });
  
      return await this.postWithFile<any>(endpoint, formData);
    } catch (error) {
      this.handleError(error);
    }
  }
  
  private formatEmail(email: string): string {
    return email.trim().replace(/\.com$/i, '').toLowerCase();
  }

  private handleError(error: any): void {

    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw new Error('Erro desconhecido');
    }
  }
}
