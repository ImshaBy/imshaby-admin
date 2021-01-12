import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IParish } from "../api/interfeces";
import Header from "../components/header";
import CreateModal from "../components/modalCreate";
import Loading from "../components/loading";

import Section from "../components/section";
import SectionHeader from "../components/sectionHeader";
import {USER_PARISH_FIELD} from "../utils/constans";
import {getParishById} from "../api";
import Parish from "../components/parish";
import Schedule from "../components/schedule";
import DatePicker from "react-datepicker";

const MainPage = () => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [parish, setParish] = useState<IParish>(null)
  const [startDate, setStartDate] = useState<Date>(new Date());
  useEffect(() => {

    const parishId = user[USER_PARISH_FIELD];
    fetchParish(parishId);
  }, [user])

  const fetchParish = async (id: string) => {
    const token = await getAccessTokenSilently();
    const parish = await getParishById(token, id);
    setParish({...parish, id});
  }

  const handleLogout = () => console.log('Logout');

  if (isLoading || !user || !parish) return <Loading />;
  return <>
    <Header />

    {/*<Section*/}
    {/*  header={*/}
    {/*    <SectionHeader title={parish.name} action={true} callback={handleLogout} />*/}
    {/*  }*/}
    {/*  content={*/}
    {/*    <Parish parish={parish} />*/}
    {/*  }*/}
    {/*/>*/}

    {/*<Section*/}
    {/*  header={*/}
    {/*    <SectionHeader title='Расклад на тыдзень' />*/}
    {/*  }*/}
    {/*  content={*/}
    {/*    <Schedule parish={parish}/>*/}
    {/*  }*/}
    {/*/>*/}


    <DatePicker selected={startDate} onChange={handleLogout}/>
  </>
};

export default MainPage;
