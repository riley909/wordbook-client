import React from 'react';
import styles from '../../styles/StudyLogList.module.css';
import { BsChatRightTextFill } from 'react-icons/bs';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function StudyLogListItem({ list }) {
  return (
    <div>
      {list.map((val) => {
        const createdAt = val.createdAt.split('.')[0].split('T');
        return (
          <div className={styles.item_border}>
            <div className={styles.item_container}>
              <div className={styles.item_header}>
                <div className={styles.item_date_area}>
                  <div className={styles.item_date}>{createdAt[0]}</div>
                  <div className={styles.item_time}>{createdAt[1]} 작성</div>
                </div>

                <div className={styles.item_icon_area}>
                  <div className={styles.item_edit_icon}>
                    <FaEdit />
                  </div>
                  <div className={styles.item_delete_icon}>
                    <FaTrashAlt />
                  </div>
                </div>
              </div>
              <div className={styles.item_content_area}>
                <div className={styles.item_content}>{val.content}</div>
              </div>
              <div className={styles.item_footer}>
                <div className={styles.item_comment_area}>
                  <div className={styles.item_comment_icon}>
                    <BsChatRightTextFill />
                  </div>
                  <div className={styles.item_comment_count}>0</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
