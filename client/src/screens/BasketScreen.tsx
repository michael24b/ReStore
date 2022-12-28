import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Basket } from "../models/basket";
import { Button, Table, Image, Container, Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { currencyFormat } from "../util/util";
import BasketSummary from "../components/BasketSummary";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../slices/basketSlice";

const BasketScreen = () => {
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Basket Screen</h1>
      {
        // loading ? (
        //   <Loader />
        // ) :
        error ? (
          <Message variant="danger">{error.request}</Message>
        ) : basket ? (
          <>
            <Table striped bordered className="mt-5 square rounded-6">
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
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: 1,
                              name: "rem",
                            })
                          )
                        }
                      ></i>
                      <span> {item.quantity} </span>
                      <i
                        className="fa-solid fa-plus"
                        onClick={() =>
                          dispatch(
                            addBasketItemAsync({ productId: item.productId })
                          )
                        }
                      ></i>
                    </td>
                    <td>${((item.price / 100) * item.quantity).toFixed(2)}</td>
                    <td>
                      {" "}
                      <Button
                        variant="danger"
                        className="btn-sm "
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: item.quantity,
                              name: "del",
                            })
                          )
                        }
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
                <BasketSummary />
              </Row>
            </Container>
          </>
        ) : (
          <Message>
            Your basket is empty <Link to="/">Go Back</Link>
          </Message>
        )
      }
    </>
  );
};
export default BasketScreen;
