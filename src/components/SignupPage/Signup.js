import { Col, Input, Row, Form, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Row align="middle">
      1
      <Col span={24}>
        2
        <Row>
          3
          <Col span={12}>
            4<div>Sign Up</div>
            <div>| 회원가입 |</div>
            <div />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Item label="이메일" required>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </Form.Item>

              <Form.Item required label="비밀번호">
                <Input.Password
                  id="password"
                  name="password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </Form.Item>

              <Form.Item required label="비밀번호 확인">
                <Input.Password
                  id="confirmPassword"
                  name="confirmPassword"
                  {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div>{formik.errors.confirmPassword}</div>
                ) : null}
              </Form.Item>

              <Form.Item>
                <Button>회원가입</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
