import { UserResponse } from "@fusionauth/typescript-client";

export type App = {
  city_id: string,
  parish_id: string,
  user: UserResponse | null,
  expire_time: Date
};
