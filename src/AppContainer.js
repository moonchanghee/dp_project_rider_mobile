import React , {useState}from 'react';
import produce from 'immer';
import App from './App'
const AppContainer = () => {
const [login , setLogin] = useState(false)
const [session, setsession] = useState();
const webSocket = new WebSocket('ws://192.168.64.94:8080/echo');
const [data, setData] = useState([{}]);
const [loginData , setLoginData] = useState([{

}]); 
const add = (name, address , menu) => {
  let newData = produce(data, (draft) => {
    draft.push({ name:name , address: address , menu:menu });
  });
  setData(newData);
};

const callbacks = {
    setLogin,
    setsession,
    add,
    setLoginData
  };
  const states = {
    login,
    session,
    webSocket,
    data,
    loginData
  };


    return (
        <App callbacks ={callbacks} states ={states}></App>
    );
};

export default AppContainer;