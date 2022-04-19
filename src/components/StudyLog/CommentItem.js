import React, { useEffect } from 'react';
import styles from '../../styles/Comment.module.css';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';

export default function CommentItem({ getComments, studyLogId, comments, setComments }) {
  const commentList = useSelector((state) => state.comment.data);
  const total = commentList && commentList.total;
  const limit = commentList && commentList.limit;
  const lastPage = Math.ceil(total / limit);
  const currentPage = commentList && commentList.currentPage;

  useEffect(() => {
    setComments((prev) => {
      if (!prev && currentPage === 1) {
        return commentList;
      } else {
        if (commentList) {
          return Object.assign(prev, { data: prev.data.concat(commentList.data) });
        }
      }
    });
  }, [commentList]);

  const handleMoreComments = (id) => {
    // 페이지가 남아있을때만 데이터 가져옴
    if (currentPage < lastPage) {
      getComments(id, '', currentPage + 1);
    }
  };

  return (
    <div>
      {comments ? (
        <div>
          <div className={styles.item_border}></div>
          {comments.data.map((val) => {
            const createdAt = val.createdAt.split('.')[0].split('T');
            return (
              <div key={val.id}>
                <div className={styles.item_container}>
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
          <div onClick={() => handleMoreComments(studyLogId)}>더보기</div>
        </div>
      ) : (
        <LoadingWithOutHeader />
      )}
    </div>
  );
}
