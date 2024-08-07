import { useGate, useUnit } from 'effector-react';

import Header from '../components/header';
import Loading from '../components/loading';
import ParishEdit from '../components/parishEdit';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';
import { logout } from '../models/app';
import { $parish, ParishGate } from '../models/parish';

const ParishPage = () => {
  const parish = useUnit($parish);
  useGate(ParishGate);

  if (!parish) return <Loading />;
  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title={parish.name} logout={logout} />
        }
        content={
          <ParishEdit />
        }
        config={{
          mobileHeader: false,
        }}
      />
    </>
  );
};

export default ParishPage;
