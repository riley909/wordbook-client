import { Divider } from 'antd';
import React from 'react';
import styles from '../../styles/Footer.module.css';

export default function Footer() {
  return (
    <>
      <Divider style={{ backgroundColor: 'grey' }} />
      <div className={styles.footer}>
        <div>
          <a href="https://bit.ly/2S6gP0M" target="_blank">
            Blog
          </a>
          <span> | </span>
          <a href="https://github.com/riley909" target="_blank">
            Github
          </a>
        </div>
        <div>
          <span>author : riley</span>
          <br />
          <span>email: increaseblue666@gmail.com</span>
        </div>
      </div>
    </>
  );
}
