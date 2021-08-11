import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const isVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://react-http-b2a24-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT", //POST add new items as a list, PUT override the old data
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {isVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
