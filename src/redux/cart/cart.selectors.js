import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);
// Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
// So in this case, if state is not changed ( because we pass state to the selector so it is the input), the selector is not recomputed.
// Thus our card icon component that takes the selectCartItemsCount as a prop is not rerendered.
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity,
    0
  )
);
