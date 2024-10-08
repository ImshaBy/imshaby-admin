export type Mass = {
  id?: string;
  cityId?: string;
  langCode?: string;
  time?: string;
  days?: number[] | null;
  notes?: string;
  localizedInfo?: {
    ru: Localization;
    en: Localization;
    pl: Localization;
  };
  parishId?: string;
  startDate?: string;
  endDate?: string;
  singleStartTimestamp?: number;
  online?: boolean | null;
  rorate?: boolean | null;
};

type Localization = {
  name: string;
  address: string;
};

export type Period = {
  from: string;
  to?: string;
};

export enum MassMode {
  EDIT,
  CREATE,
  HIDDEN,
}

export type MassError = {
  error: boolean;
  message?: string;
  errorDay?: number | null;
};
