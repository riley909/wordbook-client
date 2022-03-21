import React from 'react';
import { useNavigate } from 'react-router';
import WordBook from './WordBook';

export default function WordBookContainer() {
  const navigate = useNavigate();

  const home = () => window.open('/');
  const wordbook = () => navigate('/wordbook');

  return <WordBook home={home} wordbook={wordbook} />;
}
