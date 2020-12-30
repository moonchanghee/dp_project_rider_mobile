import React from 'react';
import LoginPresenter from './LoginPresenter'


const LoginContainer = ({states, callbacks}) => {

    return (
        <LoginPresenter states ={states} callbacks ={callbacks} >
            
        </LoginPresenter>
    );
};

export default LoginContainer;