import React from 'react';
import { Layout, Form, Input, Button, Radio, message } from 'antd';
import MainPresenter from './MainPresenter'
const { Header, Content, Footer } = Layout;
const MainContainer = ({states , callbacks}) => {

    return (

       <MainPresenter states  ={states} callbacks= {callbacks}/> 

    );
};
export default MainContainer;