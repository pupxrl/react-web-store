const initialState = {
  user: {
    username: '',
    isAuthenticated: false,
  },
  cart: {
    items: [],
    total: 0,
    shippingMethod: 'Standard', // Default shipping method
    shippingCost: 5, // Default shipping cost for Standard
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Authentication Reducer
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          isAuthenticated: true,
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          username: '',
          isAuthenticated: false,
        },
      };

    // Cart Reducer
    case 'ADD_TO_CART':
      const updatedItems = [...state.cart.items, action.payload];
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          total: updatedTotal, // Only update cart total, exclude shipping
        },
      };

    case 'REMOVE_FROM_CART':
      const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
      const newTotal = filteredItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        cart: {
          ...state.cart,
          items: filteredItems,
          total: newTotal, // Only update cart total, exclude shipping
        },
      };

    case 'SET_SHIPPING_METHOD':
      const shippingCost =
        action.payload === 'Standard' ? 5 :
        action.payload === 'Express' ? 10 :
        0; // Free shipping
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingMethod: action.payload,
          shippingCost: shippingCost, // Update shipping cost
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
