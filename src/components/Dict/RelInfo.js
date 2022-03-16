import React from 'react';

export default function RelInfo({ reference, rel_info, onWordClick }) {
  return (
    <>
      {Array.isArray(rel_info) ? (
        <div>
          <span>[{rel_info[0].type}]</span>
          {rel_info.map((info) => (
            <span
              key={info.link_target_code}
              id={info.link_target_code}
              onClick={onWordClick}>
              {info.word}
            </span>
          ))}
        </div>
      ) : (
        <div>
          {reference !== '' && <li>{reference}</li>}
          <span>[{rel_info.type}]</span>
          <span id={rel_info.link_target_code} onClick={onWordClick}>
            {rel_info.word}
          </span>
        </div>
      )}
    </>
  );
}
