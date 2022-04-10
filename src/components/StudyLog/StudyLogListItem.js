import React from 'react';
import styles from '../../styles/StudyLogList.module.css';
import { BsChatRightTextFill } from 'react-icons/bs';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Popconfirm } from 'antd';

export default function StudyLogListItem({ list, handleDelete }) {
  return (
    <div>
      {list.map((val) => {
        const createdAt = val.createdAt.split('.')[0].split('T');
        return (
          <div key={val.id} className={styles.item_border}>
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
                  <Popconfirm
                    title="이 로그를 삭제할까요?"
                    onConfirm={() => handleDelete(val.id)}
                    okText="확인"
                    cancelText="취소">
                    <div className={styles.item_delete_icon}>
                      <FaTrashAlt />
                    </div>
                  </Popconfirm>
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
                  <div className={styles.item_comment_count}>
                    {val.commentIds ? val.commentIds.length : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
