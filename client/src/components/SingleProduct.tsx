import React from "react";
import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Product } from "../models/product";

interface Props {
  product: Product;
}
function ProductCard({ product }: Props) {
  return (
    <Card className="my-3 p-3 rounded card">
      {/* <Link to="/"> */}
      <Card.Img src={product.pictureUrl} variant="top" className="img" />
      {/* </Link> */}
      <Card.Body>
        {/* <Link to="/"> */}
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
        {/* </Link> */}

        {/* <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text> */}

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
