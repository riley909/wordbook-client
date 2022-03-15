import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../NavBar/Header';
import SearchInput from './SearchInput';

export default function DictView({ search }) {
  const searchViewResult = useSelector((state) => state.dict.searchView.data);

  console.log('searchView', searchViewResult);

  if (!searchViewResult) {
    return <Header />;
  }

  return (
    <div>
      <Header />
      <SearchInput search={search} />
    </div>
  );
}
