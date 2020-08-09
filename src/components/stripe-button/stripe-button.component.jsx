import React from "react";
import StripeCheckout from "react-stripe-checkout";
import "./stripe-button.styles.scss";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions";
import { withRouter } from "react-router-dom";
const StripeCheckoutButton = ({ price, history,clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HDxehD3K4qcsM2N3RrSGCEKpC1UyXXUHEc39NO1qQTAW4wnoRVl5yZalbzWlzSaqxfDhIFik1HWFESamAVwHBYm00H75O0pRp";

  const onToken = (token) => {
    console.log(token);
    clearCart();
    alert("Payment Succesful!");
    history.replace("/");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(StripeCheckoutButton)
);

