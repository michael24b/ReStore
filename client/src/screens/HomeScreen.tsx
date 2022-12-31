import React from "react";

import { useEffect, useState } from "react";
import { Product } from "../models/product";
import ProductList from "../components/ProductList";
import { Col, Row } from "react-bootstrap";
import agent from "../api/agent";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "../slices/catalogSlice";
import Options from "../components/Options";

function HomeScreen() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>("");

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   agent.Products.list()
  //     .then((res) => setProducts(res))
  //     .catch((error) => setError(error.response))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  return (
    <>
      <Options />
      <Options />

      {status.includes("pending") ? (
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
