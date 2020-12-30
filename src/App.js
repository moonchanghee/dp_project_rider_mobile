import logo from './logo.svg';
import './App.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import HeaderPresenter from './page/header/HeaderContainer'
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import MainContainer from './page/MainContainer'
import LoginContainer from './page/header/login/LoginContainer'
const { Footer } = Layout;
const  App = ({states , callbacks}) => {
  console.log(callbacks)
  return (
    <>
    <Layout style={{ minHeight: '90vh' , backgroundColor : "#ffffff" }}>
    <BrowserRouter>

      <Layout style ={{width :" 550px" , margin : "auto" , marginTop : "2%" }}>
      <Switch>
        <Route
        path="/"
        render={(props) => (
          <HeaderPresenter {...props} states={states} callbacks={callbacks} />
        )}
      />
      </Switch>
      {states.login ?      <Switch>
        <Route
        path="/main"
        render={(props) => (
          <MainContainer {...props} states={states} callbacks={callbacks} />
        )}
      />
        </Switch>: "" }

      <Switch>
      <Route
      exact
      path="/"
      render={(props) => (
        <LoginContainer {...props} states={states} callbacks={callbacks} />
      )}
    />
    </Switch>
      
    </Layout>
    </BrowserRouter>
  </Layout>    
    </>

  );
}

export default App;
