import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import ProductDetails from "./screens/ProductDetails";
import Contact from "./screens/Contact";
import About from "./screens/About";
import NotFound from "./screens/NotFound";
import BasketScreen from "./screens/BasketScreen";
import CheckoutPage from "./screens/CheckoutPage";
import { getCookie } from "./util/util";
import agent from "./api/agent";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./store/configureStore";
import { setBasket } from "./slices/basketSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/basket" element={<BasketScreen />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
