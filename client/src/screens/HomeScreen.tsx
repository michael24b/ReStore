import React from "react";

import { useEffect, useState } from "react";
import { Product } from "../models/product";
import ProductList from "../components/ProductList";
import { Col, Row } from "react-bootstrap";
import agent from "../api/agent";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    agent.Products.list()
      .then((res) => setProducts(res))
      .catch((error) => setError(error.response))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products ? (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <ProductList product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <h3>Products Not Found</h3>
      )}
    </>
  );
}

export default HomeScreen;
