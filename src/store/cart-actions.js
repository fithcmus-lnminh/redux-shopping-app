import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//action creator thunk
export const fetchCartData = () => {
  //return func with dispatch => redux-thunk
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-b2a24-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  //return func with dispatch => redux-thunk
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Please wait...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-b2a24-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", //POST add new items as a list, PUT override the old data
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending data failed!",
        })
      );
    }
  };
};
