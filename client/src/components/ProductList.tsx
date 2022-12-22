import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../models/product";

interface Props {
  product: Product;
}

function ProductList({ product }: Props) {
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
        <Card.Title as="div" className="mx-auto">
          <strong>{product.name}</strong>
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
            <Button className=" btn-sm">ADD TO CART</Button>
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
