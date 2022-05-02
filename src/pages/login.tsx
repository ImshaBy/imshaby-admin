import React, { ChangeEvent } from 'react';
import { useGate, useStore } from 'effector-react';
import { LoginGate, logout } from '../models/app';
import { $cities, changeCity } from '../models/city';
import { $parishes, changeParish } from '../models/parish';
import SectionHeader from '../components/sectionHeader';
import Section from '../components/section';
import Header from '../components/header';


const LoginPage = () => {
  const cities = useStore($cities);
  const parishes = useStore($parishes)
  useGate(LoginGate);

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    changeCity(e.target.value);
  }

  const handleParishChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    changeParish(e.target.value);
  }

  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title={'Login Page'} />
        }
        content={
          <>
            <select onChange={handleCityChange}>
              <option value={''}>---</option>
              {
                cities.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
              }
            </select>
            <br/>
            <br/>
            <select onChange={handleParishChange}>
              <option value={''}>---</option>
              {
                parishes.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
              }
            </select>
          </>
        }
      />
    </>
  );
};

export default LoginPage;
