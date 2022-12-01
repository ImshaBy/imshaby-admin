export type Parish = {
  id: string;
  imgPath: string;
  userId: null;
  name: string;
  address: string;
  gps: null;
  key: string,
  updatePeriodInDays: number;
  localizedInfo: {
    ru: Localization;
    en: Localization;
    pl: Localization;
  },
  needUpdate: boolean;
  lastModifiedDate: Date;
  lastMassActualDate: Date;
  cityId: string;
  phone: string;
  supportPhone: string;
  email: string;
  lastModifiedEmail: null;
  website: string;
  broadcastUrl: string;
  _links: {
    self: {
      href: string;
    }
  }
};

type Localization = {
  name: string;
  address: string;
};
