import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Button , Modal } from 'antd';
import Axios from 'axios'
const { Header } = Layout;
const HeaderPresenter = ({states ,callbacks }) => {
  let history = useHistory();
  const [madal , setModal] = useState(false)
  const [datadata ,setdatadata] = useState([{}])
  const logout =() => {
    callbacks.setLogin(false)
    setModal(false)
    alert("로그아웃 되었습니다")
    states.webSocket.close()
    history.goBack('/');
  }
  const modalon = () =>{
    const body ={
      Authorization: states.session
    }
    console.log(states.session)
    Axios.post('http://192.168.64.94:8080/v1/deliverer/logout', body, 
  {  headers: {
      Authorization: states.session, 
      'Content-Type': 'application/json;charset=UTF-8',
    }}
    ).then((e) => {
      console.log(e)
      setdatadata(e.data.data)
    })
    setModal(true)
  }
  const handleOk = () => {
    setModal(false)
  }
  const handleCancel = () =>{
    setModal(false)
  }
    return (
      <>
      {states.login ?  <Header>
        <p
          style={{
            color: '#FFFFFF',
          }}

        >
        배달원-MOBILE
        <Button onClick ={modalon} style = {{marginLeft : "41%"}}>배달종료 및 정산</Button>
        </p>

        <Menu
          style={{ marginLeft: '90%', width: ' 20px' }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        ></Menu>
      </Header> :  <Header>
      <p
        style={{
          color: '#FFFFFF',
        }}

      >
      배달원-MOBILE

      </p>

      <Menu
        style={{ marginLeft: '90%', width: ' 20px' }}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      ></Menu>
    </Header>}

    {states.login ? 
    <Modal
    visible={madal}
    onOk={handleOk}
    onCancel={handleCancel}
    style ={{width : "200px"}}
    
  >
    <h1>일일 정산</h1>
<p>금일 배달 횟수: {datadata.deliverer_todayCnt}</p>
    <p>금일 벌점 횟수: {datadata.caution_todayCnt}</p>
    <p>정산 후 등급 : {datadata.grade_nm}</p>
    <p>정산 후  점수 : {datadata.deliverer_score}</p>
      <p>금일 정산 금액 : {datadata.deliverer_todayPrice}</p>
    <Button onClick={logout}>종료</Button>
  </Modal> 
    :""
    }
      </>
      );
};

export default HeaderPresenter;

