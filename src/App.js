import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { HomePage } from './pages/homepage/homepage.component';
import { ShopPage } from './pages/shop/shop.component';
import { Header } from './components/header/header.component';
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

export const HatsPage = () =>  (
  <div>
    <h1>HATS PAGE</h1>
  </div>
 )

export const Hat = () =>  {
  let params = useParams();

   return (
    <div>
      <h1>HAT #{params.hatId} </h1>
    </div>
   )
 }

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
 
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="shop/hats" element={<HatsPage />} />
          <Route path="shop/hats/:hatId" element={<Hat />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
