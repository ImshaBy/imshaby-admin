import React from 'react';
import { useGate, useStore } from 'effector-react';

import Header from '../components/header';
import Loading from '../components/loading';
import ParishEdit from '../components/parishEdit';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';

import { $parish, ParishGate } from '../models/parish';
import { logout } from '../models/app';

const ParishPage = () => {
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
          <ParishEdit />
      }
      />
    </>
  );
};

export default ParishPage;
