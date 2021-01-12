import {IMassCreate, IParish, IWeekSchedule} from "./interfeces";
import parse from "date-fns/parse";

const BASE_URL = process.env.API_URL;
const DATE_MASK = 'dd-MM-yyyy HH:mm:ss';

export const getParishById = async (token, id): Promise<IParish> => {
  const parish = await request(BASE_URL + 'parish/' + id, token);
  parish.lastMassActualDate = parse(parish.lastMassActualDate, DATE_MASK, new Date());
  parish.lastModifiedDate = parse(parish.lastModifiedDate, DATE_MASK, new Date());
  return Promise.resolve(parish)
};

export const getWeekSchedule = async (token, id, date): Promise<IWeekSchedule> => {
  let weekSchedule = await request(BASE_URL + 'mass/week?' + `parishId=${id}&date=${date}`, token);
  weekSchedule.startWeekDate = parse(weekSchedule.startWeekDate, 'MM/dd/yyyy', new Date())
  weekSchedule.schedule = weekSchedule.schedule?.map((i) => ({...i, date: parse(i.date, 'MM/dd/yyyy', new Date())}))
  return Promise.resolve(weekSchedule);
};

export const createMass = async (token, data: IMassCreate) => {
  return await requestPost(BASE_URL + 'mass', token,'POST', data)
};

export const deleteMass = async (token, id: string, period: {from: string, to: string}) => {
  const url = new URLSearchParams(period);
  return await request(BASE_URL + `mass/${id}/` + url, token,'DELETE')
};

export const approveSchedule = async (token: string, parishId: string): Promise<any> => {
  return await request(BASE_URL + `mass?parishId=${parishId}`, token,'PUT')
};





const request = (url, token, method?, data?) => {
  return fetch(url, {
    method: method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => handleError(res))
    .then(res => res.json())
    .catch(err => console.error(err))
};

const requestPost = (url, token, method?, data?) => {
  return fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => handleError(res))
    .then(res => res.json())
    .catch(err => console.error(err))
};

const handleError = (res) => {
  if(!res.ok) throw new Error(res.statusText)
  return res
}