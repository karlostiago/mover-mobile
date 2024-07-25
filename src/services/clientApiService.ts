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
      throw error;
    }
  }

  public async sendSecurityCode(clientId: number, email: string): Promise<any> {
    try {
      const endpoint = `/sender/send-security-code/${clientId}/${email}`;
      return await this.post<any>(endpoint, {});
    } catch (error) {
      throw error;
    }
  }

  public async validateSecurityCode(clientId: number, email: string, code: string): Promise<any> {
    try {
      const endpoint = `/sender/validate-security-code/${clientId}/${email}/${code}`;
      return await this.post<any>(endpoint, {});
    } catch (error) {
      throw error;
    }
  }

  public async registerClientAndUser(clientRequest: Client & { password: string; confirmPassword: string }): Promise<any> {
    try {
      const endpoint = '/clients/register/client-and-user';
      return await this.post<any>(endpoint, clientRequest);

    } catch (error) {
      throw error;
    }
  }

  public async login(cpf: string, password: string): Promise<any> {
    try {
      const endpoint = `/users/login/${cpf}/${password}`;
      return await this.get<any>(endpoint);
    } catch (error) {
      throw error;
    }
  }
}
