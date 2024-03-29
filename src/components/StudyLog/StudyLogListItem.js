import React, { useRef, useState } from 'react';
import styles from '../../styles/StudyLogList.module.css';
import { BsChatRightTextFill } from 'react-icons/bs';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import CommentItem from './CommentItem';

export default function StudyLogListItem({
  list,
  handleDelete,
  handleUpdate,
  MAX_LENGTH,
  getComments,
  createComment,
  deleteComment,
}) {
  const [editClick, setEditClick] = useState(null);
  const [commentClick, setCommentClick] = useState(null);
  const [itemTextLength, setItemTextLength] = useState(0);
  const [itemTextValue, setItemTextValue] = useState();
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  const COMMENT_LIMIT = 5;
  const textRefs = useRef([React.createRef(), React.createRef()]);

  const openUpdateForm = (val) => {
    setEditClick(val.id);
    setItemTextValue(val.content);
    setItemTextLength(val.content.length);
  };

  const handleResizeHeight = (idx) => {
    textRefs.current[idx].current.style.height = 'auto';
    textRefs.current[idx].current.style.height =
      textRefs.current[idx].current.scrollHeight + 'px';
  };

  const handleTextLength = (e) => {
    const value = e.target.value;
    setItemTextValue(value);
    setItemTextLength(value.length);

    if (value.length > MAX_LENGTH) {
      setItemTextValue(value.slice(0, MAX_LENGTH));
      setItemTextLength(MAX_LENGTH);
    }
  };

  const onCancel = () => {
    setEditClick(null);
  };
  const onUpdate = (id) => {
    const body = {
      content: itemTextValue,
    };
    handleUpdate(id, body);
    setEditClick(null);
  };

  const openCommentForm = (val) => {
    if (commentClick === val.id) {
      setCommentClick(null);
      setComments(null);
    } else {
      setCommentClick(val.id);
      getComments(val.id, COMMENT_LIMIT, 1);
    }
  };

  const commentOnChange = (e) => {
    const val = e.target.value;
    setCommentText(val);
  };

  const handleCreateComment = () => {
    const body = {
      content: commentText,
      studyLogId: commentClick,
    };
    createComment(body);
    setCommentText('');
  };

  const handleDeleteComment = (id, studyLogId, limit) => {
    deleteComment(id);
    getComments(studyLogId, limit, 1);
  };

  return (
    <div>
      {list.map((val, idx) => {
        const createdAt = val.createdAt.split('.')[0].split('T');
        return (
          <div key={val.id} className={styles.item_border}>
            <div className={styles.item_container}>
              {editClick !== val.id ? (
                <div>
                  <div className={styles.item_header}>
                    <div className={styles.item_date_area}>
                      <div className={styles.item_date}>{createdAt[0]}</div>
                      <div className={styles.item_time}>{createdAt[1]} 작성</div>
                    </div>

                    <div className={styles.item_icon_area}>
                      <div
                        id={val.id}
                        className={styles.item_edit_icon}
                        onClick={() => openUpdateForm(val)}>
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
                    <div>
                      <div
                        className={styles.item_comment_area}
                        onClick={() => openCommentForm(val)}>
                        <div className={styles.item_comment_icon}>
                          <BsChatRightTextFill />
                        </div>
                        <div className={styles.item_comment_count}>
                          {val.commentIds ? val.commentIds.length : 0}
                        </div>
                      </div>
                      <div>
                        {commentClick === val.id && (
                          <div>
                            <div className={styles.comment_textarea}>
                              <textarea onChange={commentOnChange} value={commentText} />
                              <button onClick={handleCreateComment}>작성</button>
                            </div>
                            <div>
                              <CommentItem
                                getComments={getComments}
                                studyLogId={commentClick}
                                comments={comments}
                                setComments={setComments}
                                COMMENT_LIMIT={COMMENT_LIMIT}
                                handleDeleteComment={handleDeleteComment}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.edit_area}>
                  <textarea
                    ref={textRefs.current[idx]}
                    onInput={() => handleResizeHeight(idx)}
                    onChange={handleTextLength}
                    value={itemTextValue}
                  />
                  <div className={styles.edit_button_area}>
                    <div>
                      {itemTextLength} / {MAX_LENGTH}
                    </div>
                    <button onClick={onCancel}>취소</button>
                    <button onClick={() => onUpdate(val.id)}>수정</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
