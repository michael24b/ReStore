import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Table } from "react-bootstrap";
import { Product } from "../models/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import agent from "../api/agent";

// interface Props {
//   variant: string;
//   children: any;
// }

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const intId = id ? parseInt(id) : 0;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    agent.Products.details(intId)
      .then((res) => setProduct(res))
      .catch((error) => setError(error.response))
      .finally(() => setLoading(false));
  }, [intId]);

  console.log("Error");
  console.log(error);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : product ? (
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
            <Col md={6} className="d-flex">
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Price</td>
                    <td>{product.price && (product.price / 100).toFixed(2)}</td>
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
            </Col>
          </Row>
        </>
      ) : (
        <h3>Product Not Found</h3>
      )}
    </>
  );
}

export default ProductDetails;
