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

function App() {
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
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
