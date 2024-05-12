export type PaymentType = 'MONTHLY' | 'QUARTERLY' | 'ONE_TIME';

export enum BonusType {
  ONE_TIME = 1,
  ROUTER_FREE = 2,
  VIRTUAL_CASH = 3,
}

export interface PaymentBonus {
  paymentType: PaymentType;
  bonusType: BonusType;
  description: string;
}

export interface Payment {
  paymentType: PaymentType;
  monthlyTariff: number;
  quarterlyTariff: number;
  oneTimeTariff?: number;
  paymentBonus: PaymentBonus[];
}

export interface ContractTerms {
  manadatoryTenureInMonths: number;
  monthlyCancellable: boolean;
}

export interface TariffDetails {
  payment: Payment;
  contractTerms: ContractTerms;
}

export interface Tariff {
  id: string;
  name: string;
  upSpeed: number;
  downSpeed: number;
  tariffValue: number;
  benefits: string[];
  details: TariffDetails;
}

export interface RegionalTariff {
  id: string;
  regionReferenceId: string;
  tariffs: Tariff[];
}

export interface Region {
  country: string;
  city: string;
  maxUpSpeedLimit: number;
  maxDownSpeedLimit: number;
}

export interface country {
  name: string;
  code: string;
}

export interface tariffFilter {
  name: string;
  upSpeed: number;
  downSpeed: number;
  tariffValue: number;
}
