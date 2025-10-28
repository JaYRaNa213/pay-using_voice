export interface IUser {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  balance: number;
}

export interface ITransaction {
  _id?: string;
  from: string;           // userId
  to: string;             // name or UPI id
  amount: number;
  type: 'SEND' | 'REQUEST' | 'BILL';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  timestamp?: string;
  meta?: Record<string, any>;
}

export interface IParsedIntent {
  action: 'send' | 'request' | 'check' | 'split' | 'pay';
  amount?: number;
  currency?: string;
  receiver?: string;
  participants?: string[]; // for split
  raw?: string;
}
