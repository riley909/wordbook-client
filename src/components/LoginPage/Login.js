import { Button, Col, Input, Row } from 'antd';
import { useRef } from 'react';
import styles from '../../styles/LoginPage.module.css';

export default function Login({ login }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function onButtonClick() {
    const email = emailRef.current.state.value;
    const password = passwordRef.current.state.value;
    const body = {
      email,
      password,
    };
    login(body);
  }

  return (
    <Row align="middle" className={styles.login_row}>
      <Col span={24}>
        <Row justify="center" className={styles.login_contents}>
          <Col span={12}>
            <div className={styles.login_title}>[WordBook]</div>
            <div className={styles.login_subtitle}>| Bahasa Indonesia |</div>
            <div className={styles.login_underline} />
            <div className={styles.email_area}>
              <span className={styles.email_title}>Email</span>
              <span className={styles.required}> *</span>
              <div className={styles.input_area}>
                <Input
                  placeholder="이메일"
                  autoComplete="email"
                  name="email"
                  className={styles.input}
                  ref={emailRef}
                />
              </div>
            </div>
            <div className={styles.password_area}>
              <span className={styles.password_title}>Password</span>
              <span className={styles.required}> *</span>
              <div className={styles.input_area}>
                <Input
                  type="password"
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  className={styles.input}
                  ref={passwordRef}
                />
              </div>
              <div className={styles.button_area}>
                <Button size="large" className={styles.button} onClick={onButtonClick}>
                  Login
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
