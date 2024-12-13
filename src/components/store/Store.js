import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./styles/store.css";

const products = [
  { id: 1, name: "Product 1", price: 20 },
  { id: 2, name: "Product 2", price: 30 },
  { id: 3, name: "Product 3", price: 40 },
];

/*
 Store component displays the available products and allows users to add them to their cart.
 */
const Store = () => {
  const dispatch = useDispatch();

  // Function to add a product to the cart
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div id="store-container">
      <h1 id="store-title">Our Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card id="product-card">
              <Card.Body>
                <Card.Title id="product-title">{product.name}</Card.Title>
                <Card.Text id="product-price">${product.price}</Card.Text>
                <Button
                  id="add-to-cart-btn"
                  variant="primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Store;
