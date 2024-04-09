import { useGate, useUnit } from 'effector-react';

import Header from '../components/header';
import Loading from '../components/loading';
import Parish from '../components/parish';
import Schedule from '../components/schedule';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';
import { $parish, ParishGate } from '../models/parish';
import { logout } from '../models/app';

const SchedulePage = () => {
  const parish = useUnit($parish);

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
        config={{
          mobileHeader: false,
        }}
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
