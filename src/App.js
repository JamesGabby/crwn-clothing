import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { HomePage } from './pages/homepage/homepage.component';
import { ShopPage } from './pages/shop/shop.component';
import { Header } from './components/header/header.component';
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createuserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

export const HatsPage = () =>  (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

export const Hat = () =>  {
  let params = useParams();

   return (
    <div>
      <h1>HAT #{params.hatId} </h1>
    </div>
   );
 }

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createuserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()            
          });
        });
      }
      
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
 
  render() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Header />
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
