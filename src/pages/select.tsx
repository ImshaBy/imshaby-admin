import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { Select, MenuItem } from '@mui/material';

import Header from '../components/header';
import Loading from '../components/loading';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';

import { $app, logout } from '../models/app';
import { $parish, changeParish } from '../models/parish';

const SelectPage = () => {
  const app = useStore($app);

  
  if (!app.user) return <Loading />

  const parishes = Object.values<any>(app.user.user?.data?.parishes);
  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title={'Select parish'} action callback={logout} />
        }
        content={
          <>
            <Select
              value={app.parish_id}
              onChange={(e: {target: {value: string}}) => changeParish(e.target.value)}
            >
              { [...parishes, app.user.user?.data?.defaultParish].map((value: string) => <MenuItem value={value}>{value}</MenuItem>)}
            </Select>
          </>
        }
      />
    </>
  );
}

export default SelectPage;
