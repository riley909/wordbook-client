import React from 'react';
import { useSelector } from 'react-redux';
import DictListItem from './DictListItem';

export default function DictList() {
  const searchResults = useSelector((state) => state.dict.search.data);
  console.log(searchResults);

  if (!searchResults) {
    return <div>헤더</div>;
  }

  return (
    <div>
      헤더
      <div>검색창 자리</div>
      <div>
        <div>
          검색결과
          <div>
            {searchResults.channel.item.map((item, idx) => {
              let trans_pos = '';
              if (item.pos === '명사') trans_pos = 'Nomina';
              if (item.pos === '동사') trans_pos = 'Verba';
              if (item.pos === '부사') trans_pos = 'Adverbia';
              if (item.pos === '형용사') trans_pos = 'Adjektiva';
              if (item.pos === '수사') trans_pos = 'Numeralia';
              if (item.pos === '관형사') trans_pos = 'Pewatas';
              if (item.pos === '접사') trans_pos = 'Imbuhan';
              if (item.pos === '어미') trans_pos = 'Akhiran';
              if (item.pos === '품사 없음') trans_pos = 'Tidak Berkelas Kata';

              const trans_dfn = [];
              const dfn = [];
              if (Array.isArray(item.sense)) {
                item.sense.map((val) => {
                  trans_dfn.push(val.translation.trans_dfn);
                  dfn.push(val.definition);
                });
              }
              return (
                <div>
                  {Array.isArray(item.sense) ? (
                    <DictListItem
                      target_code={item.target_code}
                      idx={idx}
                      trans_word={item.sense[0].translation.trans_word}
                      word={item.word}
                      trans_pos={trans_pos}
                      pos={item.pos}
                      trans_dfn={trans_dfn}
                      dfn={dfn}
                    />
                  ) : (
                    <DictListItem
                      target_code={item.target_code}
                      idx={idx}
                      trans_word={item.sense.translation.trans_word}
                      word={item.word}
                      trans_pos={trans_pos}
                      pos={item.pos}
                      trans_dfn={item.sense.translation.trans_dfn}
                      dfn={item.sense.definition}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
