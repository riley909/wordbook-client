import React from 'react';

export default function DictListItem({
  target_code,
  idx,
  trans_word,
  word,
  trans_pos,
  pos,
  trans_dfn,
  dfn,
}) {
  const arrDfn = [];
  if (Array.isArray(trans_dfn)) {
    trans_dfn.map((val) => {
      arrDfn.push({ trans_dfn: val });
    });
    dfn.map((val, idx) => {
      arrDfn[idx].dfn = val;
    });
  }
  console.log('arrDfn', arrDfn);
  return (
    <div>
      <div key={target_code}>
        <div>{idx + 1}</div>
        <div>{trans_word}</div>
        <span>[{trans_pos}]</span>
        <span>{pos}</span>
        <div>{word}</div>
        {arrDfn.length !== 0 ? (
          <>
            {arrDfn.map((val, idx) => (
              <div>
                <div>
                  {idx + 1}
                  {val.trans_dfn}
                </div>
                <div>{val.dfn}</div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <div>{trans_dfn}</div>
            <div>{dfn}</div>
          </div>
        )}
      </div>
      <div style={{ height: '1px', backgroundColor: '#dfdfdf' }} />
    </div>
  );
}
