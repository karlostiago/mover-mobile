import { Client } from '@dtos/Client';
import { ApiService } from '@services/apiService';

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

  public async login(cpf: string, password: string): Promise<any> {
    try {
      const endpoint = `/users/login/${cpf}/${password}`;
      return await this.get<any>(endpoint);
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
