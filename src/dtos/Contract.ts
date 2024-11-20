export interface ContractDTO {
    id: number;
    vehicleId: number;
    clientId: number;
    vehicleName: string;
    clientName: string;
    number: string;
    initialDate: string;
    endDate: string | null;
    billingStartDate: string;
    depositAmount: number;
    recurrenceValue: number;
    paymentFrequency: string;
    situation: string;
    paymentDay: string;
    reason: string | null;
    active: boolean;
  }
  