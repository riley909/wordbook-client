import { Col, Input, Row, Form, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/SignupPage.module.css';

export default function Signup({ signup }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`이메일 주소를 다시 확인해 주세요.`)
        .required('이메일 주소를 입력해 주세요'),
      password: Yup.string()
        .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
          message:
            '비밀번호는 숫자 혹은 특수문자 최소 1자리, 영문 대문자 최소 1자리, 영문 소문자를 포함해야 합니다.',
        })
        .min(8, `비밀번호는 최소 8자리 입니다.`)
        .max(32, `비밀번호는 최대 32자리 입니다.`)
        .required('비밀번호를 입력해 주세요'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        '비밀번호가 일치하지 않습니다.'
      ),
    }),
    onSubmit: (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      signup(body);
    },
  });

  return (
    <Row align="middle" className={styles.signup_row}>
      <Col span={24}>
        <Row justify="center" className={styles.signup_contents}>
          <Col span={12}>
            <div className={styles.signup_title}>Sign Up</div>
            <div className={styles.signup_subtitle}>| 회원가입 |</div>
            <div className={styles.signup_underline} />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Item>
                <div className={styles.email_area}>
                  <span className={styles.email_title}>이메일</span>
                  <span className={styles.required}> *</span>
                  <div className={styles.input_area}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                      className={styles.input}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className={styles.password_area}>
                  <span className={styles.password_title}>비밀번호</span>
                  <span className={styles.required}> *</span>
                  <div className={styles.input_area}>
                    <Input.Password
                      id="password"
                      name="password"
                      {...formik.getFieldProps('password')}
                      className={styles.input}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className={styles.confirm_password_area}>
                  <span className={styles.confirm_password_title}>비밀번호 확인</span>
                  <span className={styles.required}> *</span>
                  <div className={styles.input_area}>
                    <Input.Password
                      id="confirmPassword"
                      name="confirmPassword"
                      {...formik.getFieldProps('confirmPassword')}
                      className={styles.input}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div>{formik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className={styles.button_area}>
                  <Button
                    size="large"
                    onClick={formik.handleSubmit}
                    className={styles.button}>
                    SIGNUP
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
