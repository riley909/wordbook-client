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
