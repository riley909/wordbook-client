import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../NavBar/Header';
import SearchInput from './SearchInput';
import { sortPos } from '../../utils/sortPos';
import SenseInfo from './SenseInfo';
import QueryString from 'qs';
import { useLocation } from 'react-router';

export default function DictView({ search, wordClick }) {
  const location = useLocation();
  const searchViewResult = useSelector((state) => state.dict.searchView.data);
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  if (!searchViewResult) {
    return <Header />;
  }

  const item = searchViewResult.channel.item;
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
