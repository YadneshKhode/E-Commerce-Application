import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
class App extends React.Component {
  /*
   unsubscribeFromAuth is initialised as null

 unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged(). Yihua doesn't say this in the vid but this method returns another method: firebase.unsubscribe().

(see docs here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#returns-firebase.unsubscribe)

 so when unsubscribeFromAuth() is called inside the componentWillUnmount, it now has the value of firebase.unsubscribe(), which executes, closing the session
  */
  unsbusbcribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsbusbcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsbusbcribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App); //pass null because we don't need any state from the roots reducer
