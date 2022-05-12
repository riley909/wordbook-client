import React, { useEffect, useState } from 'react';
import styles from '../../styles/Comment.module.css';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LoadingWithOutHeader from '../Loading/LoadingWithOutHeader';
import { BsChevronCompactDown } from 'react-icons/bs';

export default function CommentItem({
  getComments,
  studyLogId,
  comments,
  setComments,
  COMMENT_LIMIT,
  handleDeleteComment,
}) {
  const commentList = useSelector(
    (state) => state.comment.data && state.comment.data.data
  );
  const id = useSelector((state) => commentList && state.comment.data.studyLogId);
  const page = useSelector((state) => commentList && state.comment.data.currentPage);
  const currentPage = Number(page);
  const total = useSelector((state) => commentList && state.comment.data.total);
  const lastPage = Math.ceil(total / COMMENT_LIMIT);
  const [logId, setLogId] = useState(id);

  useEffect(() => {
    setLogId(Number(id));
  }, [id]);

  useEffect(() => {
    if (studyLogId === logId) {
      setComments((prev) => {
        // 현재 페이지가 1임
        // = 최초로 댓글창 열었을 때
        // = or 닫기전에 확인한 페이지가 1임
        if (currentPage === 1) {
          return commentList;
        }
        // 이전 데이터가 있고 현재 페이지가 1이 아님
        // = 더보기 버튼을 눌렀을 때
        if (prev && currentPage !== 1) {
          return prev.concat(commentList);
        }
        // else 이전 데이터도 없고 현재 페이지가 1이 아님
        // = 댓글창 닫으면 setComments(null) 시키므로 초기화되고
        //   창 닫기 전에 더보기를 눌러서 현재페이지가 1이 아닌 경우
        // = 다시 댓글창 열었을 때 마지막에 확인한 페이지가 set되지 않고
        //   1페이지를 불러올 때 까지 로딩이 뜨게 됨
      });
    }
  }, [commentList, logId]);

  const handleMoreComments = (id) => {
    // 페이지가 남아있을때만 데이터 가져옴
    if (currentPage < lastPage) {
      getComments(id, COMMENT_LIMIT, currentPage + 1);
    }
  };

  return (
    <div>
      {comments ? (
        <div>
          <div className={styles.item_border}></div>
          {comments.map((val) => {
            const createdAt = val.createdAt.split('.')[0].split('T');
            return (
              <div key={val.id}>
                <div className={styles.item_container}>
                  <div className={styles.item_content}>{val.content}</div>
                  <div className={styles.item_date}>{createdAt}</div>
                  <div
                    className={styles.item_delete_icon}
                    onClick={() =>
                      handleDeleteComment(val.id, studyLogId, COMMENT_LIMIT)
                    }>
                    <FaTimes />
                  </div>
                </div>
                <div className={styles.item_border}></div>
              </div>
            );
          })}
          <div
            className={styles.item_show_more}
            onClick={() => handleMoreComments(studyLogId)}>
            <BsChevronCompactDown />
          </div>
        </div>
      ) : (
        <LoadingWithOutHeader />
      )}
    </div>
  );
}
