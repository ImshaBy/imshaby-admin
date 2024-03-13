import './style.scss';

import React from 'react';

interface props {
  header?: React.ReactNode;
  content: React.ReactNode;
}

const Section = ({
  header,
  content,
} : props) => (
  <section className="block container">
    {header && <header className="block__header">{ header }</header>}
    <section className="block__content">{ content }</section>
  </section>
);

export default Section;
