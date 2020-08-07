// import React from "react";
// import "./App.css";
// import HomePage from "./pages/homepage/homepage.component";
// import { Switch, Route, Redirect } from "react-router-dom";
// import ShopPage from "./pages/shop/shop.component";
// import Header from "./components/header/header.component";
// import  CheckoutPage from "./pages/checkout/checkout.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
// import { connect } from "react-redux";
// import { setCurrentUser } from "./redux/user/user.actions";
// import { selectCurrentUser } from "./redux/user/user.selector";
// import { createStructuredSelector } from "reselect";
// class App extends React.Component {
//   /*
//    unsubscribeFromAuth is initialised as null

//  unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged(). Yihua doesn't say this in the vid but this method returns another method: firebase.unsubscribe().

// (see docs here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#returns-firebase.unsubscribe)

//  so when unsubscribeFromAuth() is called inside the componentWillUnmount, it now has the value of firebase.unsubscribe(), which executes, closing the session
//   */
//   unsbusbcribeFromAuth = null;
//   componentDidMount() {
//     const { setCurrentUser } = this.props;
//     this.unsbusbcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);
//         userRef.onSnapshot((snapShot) => {
//           setCurrentUser({
//             id: snapShot.id,
//             ...snapShot.data(),
//           });
//         });
//       } else {
//         setCurrentUser(userAuth);
//       }
//     });
//   }

//   componentWillUnmount() {
//     this.unsbusbcribeFromAuth();
//   }
//   render() {
//     return (
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={HomePage} />
//           <Route exact path="/shop" component={ShopPage} />
//           <Route exact path="/checkout" component={CheckoutPage} />
//           <Route
//             exact
//             path="/signin"
//             render={() =>
//               this.props.currentUser ? (
//                 <Redirect to="/" />
//               ) : (
//                 <SignInAndSignUpPage />
//               )
//             }
//           />
//           {/* render is JS invocation that determines what component to return in the same place where the component would be */}
//         </Switch>
//       </div>
//     );
//   }
// }
// // const mapStateToProps = ({ user }) => ({
// //   currentUser: user.currentUser,
// // });
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// });
// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(App);
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

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
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
