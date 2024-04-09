import { useGate, useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Loading from '../components/loading';
import Section from '../components/section';
import SectionHeader from '../components/sectionHeader';
import Select from '../components/select';
import { $app, logout, SelectGate } from '../models/app';
import { $selectParishes, changeParish, ParishGate } from '../models/parish';
import toast from 'react-hot-toast';

const SelectPage = () => {
  useGate(SelectGate);
  useGate(ParishGate);

  const app = useUnit($app);
  const parishes = useUnit($selectParishes);

  const [parish, setParish] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setParish(app.parish_id);
  }, [app]);

  const handleBtnClick = () => {
    changeParish(parish);
    toast('Парафія зменена');
    navigate('/schedule');
  };

  const handleChange = (e: {target: {value: string}}) => {
    setParish(e.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
              onChange={handleChange}
              btnClick={handleBtnClick}
              btnDisabled={!parish || parish === app.parish_id}
              btnTitle="Змяніць"
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </>
        )}
        config={{
          mobileHeader: false,
        }}
      />
    </>
  );
};

export default SelectPage;
