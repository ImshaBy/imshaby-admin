import './style.scss';

import React from 'react';

interface props {
  header?: React.ReactNode;
  content: React.ReactNode;
  config?: {
    mobileHeader?: boolean,
    mobileSection?: boolean,
  }
}

const Section = ({
  header,
  content,
  config,
} : props) => {
  const mobileConfig = {
    mobileHeader: true,
    mobileSection: true,
    ...config,
  }
  return (
    <section className="block container">
      {header && <header className={`block__header ${mobileConfig.mobileHeader ? "display__mobile" : ""}`}>{ header }</header>}
      <section className={`block__content ${mobileConfig.mobileSection ? "display__mobile" : ""}`}>{ content }</section>
    </section>
  )
};

export default Section;
