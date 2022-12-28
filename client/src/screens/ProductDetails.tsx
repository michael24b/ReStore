import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Table,
  Form,
  Button,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../slices/basketSlice";
import { fetchProductAsync, productSelectors } from "../slices/catalogSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { currencyFormat } from "../util/util";

// interface Props {
//   variant: string;
//   children: any;
// }

function ProductDetails() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  console.log("Basket");
  console.log(basket);
  const { id } = useParams<{ id: string }>();
  const intId = id ? parseInt(id) : 0;
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, intId)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  console.log("Client error");

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>("");
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(intId));
  }, [intId, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value > 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {productStatus.includes("pending") ? (
        <Loader />
      ) : // : error ? (
      //   <Message variant="danger">{error}</Message>
      // )
      product ? (
        <>
          {/* <Meta title={product.name} /> */}
          <Row className="d-flex">
            <Col md={6}>
              <div className="d-flex">
                <Image
                  src={product.pictureUrl}
                  alt={product.name}
                  fluid
                  className="w-50 h-50 justify-content-center mx-auto"
                />
              </div>{" "}
              <ListGroup.Item className="text-center mt-3">
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                {product.description}
              </ListGroup.Item>
            </Col>
            <Col md={6} className="">
              <Table striped bordered hover className="table">
                <tbody className="gap-2">
                  <tr>
                    <td>Price</td>
                    <td>{product.price && currencyFormat(product.price)}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      {product.quantityInStock ? "In Stock" : "Out Of Stock"}
                    </td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    {/* <td colSpan={2}>Larry the Bird</td> */}
                    <td>{product.quantityInStock}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    {/* <td colSpan={2}>Larry the Bird</td> */}
                    <td>{product.type}</td>
                  </tr>
                  <tr>
                    <td>Brand</td>
                    {/* <td colSpan={2}>Larry the Bird</td> */}
                    <td>{product.brand}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-grid gap-4">
                <Form.Control
                  type="number"
                  onChange={handleInputChange}
                  value={quantity}
                ></Form.Control>
                <Button
                  className="btn btn-outline-secondary"
                  onClick={handleUpdateCart}
                  disabled={
                    item?.quantity === quantity || (!item && quantity === 0)
                  }
                >
                  {item ? "UPDATE QUANTITY" : "ADD TO CART"}
                </Button>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <h3>Product Not Found!</h3>
      )}
    </>
  );
}

export default ProductDetails;
