import React ,{useState}from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios'
import { Layout, Form, Input, Button, Radio, message } from 'antd';
import Cookie from 'js-cookie';
const { Header, Content, Footer } = Layout;
const LoginPresenter = ({sates , callbacks}) => {
  const key = 'updatable';
    console.log(callbacks)
    let history = useHistory();
    const [userId, setUserId] = useState();
    const [userPwd, setUserPwd] = useState();
    const [value, setValue] = useState(1);
    const pwdChange = (e) => {
      console.log(e);
      setUserPwd(e.currentTarget.value);
    };
  
    const idChange = (e) => {
      console.log(e);
      setUserId(e.currentTarget.value);
    };

    const body = {
      member_id: userId,
      member_pw: userPwd,
    };
    const goMain =() => {

      Axios.post(
        'http://192.168.64.94:8080/v1/auth/deliverer',
        body
        // config
      ).then((e) => {
        console.log(e)
        Cookie.set('JSESSIONID', e.data.data.Authorization);
        callbacks.setsession(Cookie.get('JSESSIONID'));
        callbacks.setLoginData(e.data)
      });
      message.loading({ content: 'Loading...', key });

      setTimeout(() => {
        message.success({
          content: '라이더 로그인 성공',
          key,
          duration: 2,
        });
       history.push('/main');
       callbacks.setLogin(true)
      }, 400);
        
    }

    return (
        <Layout
        className="layout"
        style={{  backgroundColor: '#E6E6E6' }}
      >
    <Content style={{ padding: '0 50px' }}>
    <Form.Item
    style={{ marginLeft: '22%', marginTop: '40%' }}
    label="ID"
    name="username"
    rules={[
      {
        required: true,
        message: 'Please input your username!',
      },
    ]}
  >
    <Input
      style={{ marginLeft: '6%', width: '57%' }}
      value={userId}
      onChange={idChange}
    />
  </Form.Item>
  <Form.Item
  style={{ marginLeft: '22%' }}
  label="PWD"
  name="password"
  rules={[
    {
      required: true,
      message: 'Please input your password!',
    },
  ]}
>
  <Input.Password
    style={{ width: '60%' }}
    value={userPwd}
    onChange={pwdChange}
  />
</Form.Item>
<Button onClick={goMain} style ={{marginLeft: "40%" , marginTop : "10%" }}>배달 시작</Button>
</Content>
      </Layout>
    )
};

export default LoginPresenter;