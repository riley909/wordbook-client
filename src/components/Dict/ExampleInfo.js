import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export default function ExampleInfo({ example_info }) {
  let arrSort = example_info.sort((a, b) => {
    return a.example.length - b.example.length;
  });

  // !example_info 컴포넌트(노출 5개, 더보기 기능)

  return (
    <div>
      <ul>
        {arrSort.map((el) => (
          <li>{el.example}</li>
        ))}
      </ul>
      <div>
        더 보기 <FaCaretDown />
      </div>
      <div>
        닫기 <FaCaretUp />
      </div>
    </div>
  );
}
