import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../models/product";
import { useState } from "react";
import agent from "../api/agent";

interface Props {
  product: Product;
}

function ProductList({ product }: Props) {
  const [loading, setLoading] = useState(false);

  const handlerAddItem = (productId: number) => {
    setLoading(true);
    agent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  return (
    <Card className="my-3 p-3 rounded">
      {/* <Link to={`/product/${product._id}`}> */}
      <Card.Img
        src={product.pictureUrl}
        variant="top"
        className="w-75 h-75 mx-auto"
      />
      {/* </Link> */}
      <Card.Body className="d-grid">
        {/* <Link to={`/product/${product._id}`}> */}
        <Card.Title as="div" className="mx-auto d-flex">
          <strong className="text-center ">{product.name}</strong>
        </Card.Title>
        {/* </Link> */}

        {/* <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text> */}

        {/* <Card.Text as="p">{product.description}</Card.Text> */}
        <Card.Text as="h4" className="mx-auto">
          ${product.price && (product.price / 100).toFixed(2)}
        </Card.Text>
        <Card.Text as="p" className="mx-auto">
          {product.brand} / {product.type}
        </Card.Text>
        <Card.Footer className=" p-0 d-flex justify-content-center w-100 ">
          {/* <Card.Footer className="row g-3"> */}

          <Link to="/" className=" p-1 flex-fill text-center">
            <Button
              className=" btn-sm"
              onClick={() => handlerAddItem(product.id)}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span> LOADING... </span>
                </>
              ) : (
                <span>ADD TO CART</span>
              )}
            </Button>
          </Link>
          <Link to={`/product/${product.id}`} className=" p-1 flex-fill">
            <Button className=" btn-sm ">VIEW</Button>
          </Link>

          {/* </Card.Footer> */}
        </Card.Footer>
        {/* <Card.Text as="h4">{product.quantityInStock}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default ProductList;
