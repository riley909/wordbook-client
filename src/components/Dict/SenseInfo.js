import React from 'react';
import ExampleInfo from './ExampleInfo';
import RelInfo from './RelInfo';

export default function SenseInfo({ sense_info, onWordClick }) {
  return (
    <>
      {Array.isArray(sense_info) ? (
        sense_info.map((val, idx) => (
          <div key={idx + 1}>
            <div>
              <span>{idx + 1}</span>
              <span>{val.translation.trans_word}</span>
            </div>
            <div>
              <div>{val.definition}</div>
              <div>{val.translation.trans_dfn}</div>
            </div>
            <ExampleInfo example_info={val.example_info} />
            <>
              {val.rel_info && (
                <RelInfo
                  reference={val.reference}
                  rel_info={val.rel_info}
                  onWordClick={onWordClick}
                />
              )}
            </>
          </div>
        ))
      ) : (
        <div>
          <div>{sense_info.translation.trans_word}</div>
          <div>
            <div>{sense_info.definition}</div>
            <div>{sense_info.translation.trans_dfn}</div>
          </div>
          <ExampleInfo example_info={sense_info.example_info} />
          <>
            {sense_info.rel_info && (
              <RelInfo
                reference={sense_info.reference}
                rel_info={sense_info.rel_info}
                onWordClick={onWordClick}
              />
            )}
          </>
        </div>
      )}
    </>
  );
}
