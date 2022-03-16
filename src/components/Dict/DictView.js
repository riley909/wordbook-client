import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../NavBar/Header';
import SearchInput from './SearchInput';
import { sortPos } from '../../utils/sortPos';
import SenseInfo from './SenseInfo';

export default function DictView({ search, wordClick }) {
  const searchViewState = useSelector((state) => state.dict.searchView);

  if (searchViewState.loading) {
    return <Header />;
  }

  const item = searchViewState.data.channel.item;
  const trans_pos = sortPos(item.word_info.pos[0]);

  const onWordClick = (event) => {
    const target_code = event.target.id;
    wordClick(target_code);
  };

  return (
    <div>
      <Header />
      <SearchInput search={search} />
      <div>
        <div>{item.word_info.word}</div>
        <div>
          <div>{item.word_info.pos[0]}</div>
          <div>{trans_pos}</div>
        </div>
        <SenseInfo sense_info={item.word_info.sense_info} onWordClick={onWordClick} />
      </div>
    </div>
  );
}
