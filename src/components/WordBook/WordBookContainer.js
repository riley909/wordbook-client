import React from 'react';
import WordBook from './WordBook';

export default function WordBookContainer() {
  const home = () => window.open('/');

  return <WordBook home={home} />;
}
