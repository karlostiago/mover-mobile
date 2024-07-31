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
      console.error('Error checking existing CPF:', error);
      throw new Error('Unable to check existing CPF');
    }
  }

  public async sendSecurityCode(clientId: number, email: string): Promise<any> {
    try {
      const modifiedEmail = this.formatEmail(email);
      const endpoint = `/sender/send-security-code/${clientId}/${modifiedEmail}`;
      return await this.post<any>(endpoint, {});
    } catch (error) {
      console.error('Error sending security code:', error);
      throw new Error('Unable to send security code');
    }
  }

  public async validateSecurityCode(clientId: number, email: string, code: string): Promise<any> {
    try {
      const modifiedEmail = this.formatEmail(email);
      const endpoint = `/sender/validate-security-code/${clientId}/${modifiedEmail}/${code}`;
      return await this.post<any>(endpoint, {});
    } catch (error) {
      console.error('Error validating security code:', error);
      throw new Error('Unable to validate security code');
    }
  }

  public async updateClient(clientId: number, clientRequest: Client & { password: string; confirmPassword: string }): Promise<any> {
    try {
        const endpoint = `/clients/${clientId}`;
        return await this.put<any>(endpoint, clientRequest);

    } catch (error) {
        console.error('Error updating client:', error);
        throw new Error('Unable to update client');
    }
}

  public async login(cpf: string, password: string): Promise<any> {
    try {
      const endpoint = `/users/login/${cpf}/${password}`;
      return await this.get<any>(endpoint);
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Unable to login');
    }
  }

  private formatEmail(email: string): string {
    return email.trim().replace(/\.com$/i, '').toLowerCase();
  }
}
