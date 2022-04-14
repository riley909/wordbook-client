import React from 'react';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import styles from '../../styles/Comment.module.css';
import { FaTimes } from 'react-icons/fa';

export default function CommentItem({ comments }) {
  return (
    <div>
      {comments ? (
        <div>
          <div className={styles.item_border}></div>
          {comments.data.map((val) => {
            const createdAt = val.createdAt.split('.')[0].split('T');
            return (
              <div>
                <div key={val.id} className={styles.item_container}>
                  <div className={styles.item_content}>{val.content}</div>
                  <div className={styles.item_date}>{createdAt}</div>
                  <div className={styles.item_delete_icon}>
                    <FaTimes />
                  </div>
                </div>
                <div className={styles.item_border}></div>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingWithOutHeader />
      )}
    </div>
  );
}
