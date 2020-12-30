import React from 'react';
import HeaderPresenter from './HeaderPresenter'
const HeaderContainer = ({states , callbacks}) => {
    return (
        <HeaderPresenter callbacks ={callbacks}  states = {states}>
            
        </HeaderPresenter>
    );
};

export default HeaderContainer;