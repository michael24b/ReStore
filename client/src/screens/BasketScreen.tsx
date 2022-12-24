import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Basket } from "../models/basket";
// import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import agent from "../api/agent";
// import { addToCart, removeFromCart } from "../actions/cartActions";

const BasketScreen = () => {
  // const productId = match.params.id;
  //   const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);
  const [error, setError] = useState<any>(null);

  //   const location = useLocation();
  const navigate = useNavigate();

  //   const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //   console.log("qty :");
  //   console.log(qty);
  //   const dispatch = useDispatch();

  //   const cart = useSelector((state) => state.cart);
  //   const { cartItems } = cart;

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //   const removeFromCartHandler = (id) => {
  //     dispatch(removeFromCart(id));
  //   };

  //   const checkoutHandler = () => {
  //     if (userInfo) {
  //       navigate("/shipping");
  //     } else {
  //       navigate("/login");
  //     }
  // history.push("/login?redirect=shipping");
  //new way
  // navigate(`/cart/${id}?qty=${qty}`);
  //   };

  return (
    <>
      {/* // <Row> */}
      {/* <Col md={8}> */}
      <h1>Basket Screen </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : basket ? (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {basket.items.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>${(item.price / 100).toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${((item.price / 100) * item.quantity).toFixed(2)}</td>
                <td>
                  {" "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    // onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message>
          Your basket is empty <Link to="/">Go Back</Link>
        </Message>
      )}
    </>
  );
};
export default BasketScreen;

//   <ListGroup variant="flush">
//     {cartItems.map((item) => (
//       <ListGroup.Item key={item.product}>
//         <Row>
//           <Col md={2}>
//             <Image src={item.image} alt={item.name} fluid rounded />
//           </Col>
//           <Col md={3}>
//             <Link to={`/product/${item.product}`}>{item.name}</Link>
//           </Col>
//           <Col md={2}>${item.price}</Col>
//           <Col md={2}>
//             <Form.Control
//               size="sm"
//               as="select"
//               value={item.qty}
//               onChange={(e) =>
//                 dispatch(
//                   addToCart(item.product, Number(e.target.value))
//                 )
//               }
//             >
//               1
//               {[...Array(item.countInStock).keys()].map((x) => (
//                 <option key={x + 1} value={x + 1}>
//                   {x + 1}
//                 </option>
//               ))}
//             </Form.Control>
//           </Col>
//           <Col md={2}>
//             <Button
//               type="button"
//               variant="light"
//               onClick={() => removeFromCartHandler(item.product)}
//             >
//               <i className="fas fa-trash"></i>
//             </Button>
//           </Col>
//         </Row>
//       </ListGroup.Item>
//     ))}
//   </ListGroup>

//   </Col>
//   <Col md={4}>
//     <Card>
//       <ListGroup variant="flush">
//         <ListGroup.Item>
//           <h2>
//             Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//             items
//           </h2>
//           $
//           {cartItems
//             .reduce((acc, item) => acc + item.qty * item.price, 0)
//             .toFixed(2)}
//         </ListGroup.Item>
//         <ListGroup.Item>
//           <Button
//             type="button"
//             className="btn-block"
//             disabled={cartItems.length === 0}
//             onClick={checkoutHandler}
//           >
//             Proceed To Checkout
//           </Button>
//         </ListGroup.Item>
//       </ListGroup>
//     </Card>
//   </Col>
// </Row>
