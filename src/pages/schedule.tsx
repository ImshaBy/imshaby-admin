import React from 'react';
import { useGate, useStore } from 'effector-react';

import Header from '../components/header';
import Loading from '../components/loading';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';
import { Parish } from '../components/parish';
import Schedule from '../components/schedule';

import { $parish, ParishGate } from '../models/parish';
import { logout } from '../models/app';

const SchedulePage = () => {
  const parish = useStore($parish);

  useGate(ParishGate);

  if (!parish) return <Loading />;
  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title={parish.name} action callback={logout} />
      }
        content={
          <Parish />
      }
      />
      <Section
        header={
          <SectionHeader title="Расклад на тыдзень" />
      }
        content={
          <Schedule />
      }
      />
    </>
  );
};

export default SchedulePage;
