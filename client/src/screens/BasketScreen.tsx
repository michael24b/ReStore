import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Basket } from "../models/basket";
import { Button, Table, Image, Container, Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import agent from "../api/agent";
import { currencyFormat, getCookie } from "../util/util";

const BasketScreen = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    console.log(buyerId);
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const removeItemState = (productId: number, quantity: number) => {
    if (!basket) return;
    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setBasket((prevState) => {
        return { ...prevState!, items };
      });
    }
  };

  const removeItem = (ProductId: number, quantity: number) => {
    agent.Basket.removeItem(ProductId, quantity)
      .then(() => removeItemState(ProductId, quantity))
      .catch((error) => setError(error));
  };

  const addItem = (ProductId: number) => {
    agent.Basket.addItem(ProductId)
      .then((basket) => setBasket(basket))
      .catch((error) => setError(error));
  };

  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  console.log(error);

  return (
    <>
      <h1>Basket Screen {itemCount}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.request}</Message>
      ) : basket ? (
        <>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th className="text-center">Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {basket.items.map((item) => (
                <tr key={item.productId} className="align-middle ">
                  <td className="">
                    <Image
                      src={item.pictureUrl}
                      className="img-fluid img"
                    ></Image>
                    {item.name}
                  </td>
                  <td>{currencyFormat(item.price)}</td>
                  <td className="text-center ">
                    <i
                      className="fa-solid fa-minus"
                      onClick={() => removeItem(item.productId, 1)}
                    ></i>
                    <span> {item.quantity} </span>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => addItem(item.productId)}
                    ></i>
                  </td>
                  <td>${((item.price / 100) * item.quantity).toFixed(2)}</td>
                  <td>
                    {" "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => removeItem(item.productId, item.quantity)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Container className="mt-5">
            <Row>
              <Col md={6}>
                <h1>Container 1</h1>
              </Col>
              <Col md={6}>
                <Table striped bordered hover size="sm">
                  <tbody>
                    <tr>
                      <td className="text-start ps-5">Subtotal</td>
                      <td className="text-end pe-5 ">
                        {currencyFormat(subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-5">Delivery fee*</td>
                      <td className="text-end pe-5 ">
                        {currencyFormat(deliveryFee)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start ps-5">Total</td>
                      <td className="text-end pe-5 ">
                        {currencyFormat(subtotal + deliveryFee)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center" colSpan={2}>
                        *Orders over $100 quantity for free delivery
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Message>
          Your basket is empty <Link to="/">Go Back</Link>
        </Message>
      )}
    </>
  );
};
export default BasketScreen;
