export type WeekSchedule = {
  startWeekDate: Date;
  schedule: Schedule[];
};

export type Schedule = {
  date: Date;
  massHours?: MassHours[];
  isInaccessible?: boolean;
};

export type ScheduleResponse = {
  date: string;
  massHours: MassHours[];
};

export type MassHours = {
  hour: string;
  data: MassHoursData[];
};
export type MassHoursData = {
  id: string;
  days: number[];
  startDate: string | null;
  endDate: string | null;
  duration: number;
  info: string;
  langCode: string;
  lastModifiedDate: string;
  needUpdate: boolean;
  online: boolean;
  rorate: boolean;
  parish: {
    address: string;
    gps: null;
    imgPath: string;
    name: string;
    needUpdate: boolean;
    parishId: string;
  }
};
