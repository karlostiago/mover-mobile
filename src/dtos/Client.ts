export interface Client {
  id?: number;
  name: string;
  rg: string;
  cpf: string;
  email: string;
  number: string;
  state: string;
  cep: string;
  birthDate?: string; 
  user: {
    id?: number;
    name: string;
    email: string;
    login: string;
    password: string;
    clientId: number;
  };
}
