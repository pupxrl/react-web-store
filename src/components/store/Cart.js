import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import "./styles/cart.css";

/*
 Cart component displays the user's shopping cart with items, shipping options, and totals.
 */
const Cart = () => {
  const cart = useSelector((state) => state.cart); // Access the cart state
  const dispatch = useDispatch();
  const [showHelp, setShowHelp] = useState(false); // State to control the visibility of the help modal

  // Handler to update the shipping method
  const handleShippingChange = (shippingMethod) => {
    dispatch({ type: "SET_SHIPPING_METHOD", payload: shippingMethod });
  };

  // Handler to remove an item from the cart
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Toggle the Help Modal visibility
  const handleHelpClick = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  return (
    <div id="cart-container">
      <h2 id="cart-header">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div id="cart-items">
          {cart.items.map((item) => (
            <div id="cart-item" key={item.id}>
              <p id="cart-item-name">{item.name}</p>
              <p id="cart-item-price">${item.price}</p>
              <Button
                variant="danger"
                id="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
          <h3>Total (excluding shipping): ${cart.total}</h3>
        </div>
      )}

      {/* Shipping Method Dropdown */}
      <div id="shipping-method">
        <h4>Select Shipping Method</h4>
        <DropdownButton
          id="shipping-method-dropdown"
          title={cart.shippingMethod}
          onSelect={handleShippingChange}
        >
          <Dropdown.Item eventKey="Standard">Standard ($5)</Dropdown.Item>
          <Dropdown.Item eventKey="Express">Express ($10)</Dropdown.Item>
          <Dropdown.Item eventKey="Free">Free Shipping ($0)</Dropdown.Item>
        </DropdownButton>
        <p id="shipping-cost">Shipping Cost: ${cart.shippingCost}</p>
      </div>

      {/* Optionally display the total including shipping */}
      <h3 id="cart-footer">
        Total (including shipping): ${cart.total + cart.shippingCost}
      </h3>

      {/* Help Button */}
      <div>
        <Button variant="info" id="help-btn" onClick={handleHelpClick}>
          Help
        </Button>
      </div>

      {/* Help Modal */}
      <Modal show={showHelp} onHide={handleCloseHelp}>
        <Modal.Header closeButton>
          <Modal.Title id="help-modal-title">Shipping Options</Modal.Title>
        </Modal.Header>
        <Modal.Body id="help-modal-body">
          <h5>Available Shipping Methods</h5>
          <p>
            <strong>Standard Shipping:</strong> Delivery within 5 business days.
            Cost: $5.
          </p>
          <p>
            <strong>Express Shipping:</strong> Delivery within 2 business days.
            Cost: $10.
          </p>
          <p>
            <strong>Free Shipping:</strong> Delivery within 7-10 business days.
            Free of charge.
          </p>
        </Modal.Body>
        <Modal.Footer id="help-modal-footer">
          <Button variant="secondary" onClick={handleCloseHelp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
