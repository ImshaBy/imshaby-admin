import { useGate, useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Header from '../components/header';
import Loading from '../components/loading';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';
import Select from '../components/select';
import { $app, logout, SelectGate } from '../models/app';
import { $selectParishes, changeParish } from '../models/parish';

const SelectPage = ({ history }: RouteComponentProps) => {
  useGate(SelectGate);

  const app = useStore($app);
  const parishes = useStore($selectParishes);

  const [parish, setParish] = useState('');
  const { addToast } = useToasts();

  useEffect(() => {
    setParish(app.parish_id);
  }, [app]);

  const handleBtnClick = () => {
    changeParish(parish);
    addToast('Парафія зменена');
    history.push('/schedule');
  };

  if (!parishes) return <Loading />;

  return (
    <>
      <Header />
      <Section
        header={
          <SectionHeader title="Абярыце парафію" action callback={logout} />
        }
        content={(
          <>
            <Select
              value={parish}
              options={parishes}
              onChange={(e) => setParish(e.target.value)}
              btnClick={handleBtnClick}
              btnDisabled={!parish || parish === app.parish_id}
              btnTitle="Змяніць"
            />
          </>
        )}
      />
    </>
  );
};

export default SelectPage;
