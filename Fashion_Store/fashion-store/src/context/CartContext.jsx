import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  cartCount: 0,
  wishlistCount: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(item => 
        item.id === action.payload.id && 
        item.selectedColor === action.payload.selectedColor && 
        item.selectedSize === action.payload.selectedSize
      );
      
      if (existingCartItem) {
        const updatedCart = state.cart.map(item => 
          item.id === action.payload.id && 
          item.selectedColor === action.payload.selectedColor && 
          item.selectedSize === action.payload.selectedSize
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0)
        };
      } else {
        const newCart = [...state.cart, action.payload];
        return {
          ...state,
          cart: newCart,
          cartCount: newCart.reduce((total, item) => total + item.quantity, 0)
        };
      }

    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.cartId !== action.payload);
      return {
        ...state,
        cart: filteredCart,
        cartCount: filteredCart.reduce((total, item) => total + item.quantity, 0)
      };

    case 'UPDATE_CART_ITEM_QUANTITY':
      const updatedCart = state.cart.map(item => 
        item.cartId === action.payload.cartId 
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cart: updatedCart,
        cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0)
      };

    case 'ADD_TO_WISHLIST':
      if (!state.wishlist.includes(action.payload)) {
        const newWishlist = [...state.wishlist, action.payload];
        return {
          ...state,
          wishlist: newWishlist,
          wishlistCount: newWishlist.length
        };
      }
      return state;

    case 'REMOVE_FROM_WISHLIST':
      const filteredWishlist = state.wishlist.filter(id => id !== action.payload);
      return {
        ...state,
        wishlist: filteredWishlist,
        wishlistCount: filteredWishlist.length
      };

    case 'TOGGLE_WISHLIST':
      const isInWishlist = state.wishlist.includes(action.payload);
      if (isInWishlist) {
        const filteredWishlist = state.wishlist.filter(id => id !== action.payload);
        return {
          ...state,
          wishlist: filteredWishlist,
          wishlistCount: filteredWishlist.length
        };
      } else {
        const newWishlist = [...state.wishlist, action.payload];
        return {
          ...state,
          wishlist: newWishlist,
          wishlistCount: newWishlist.length
        };
      }

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || [],
        cartCount: (action.payload.cart || []).reduce((total, item) => total + item.quantity, 0),
        wishlistCount: (action.payload.wishlist || []).length
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartCount: 0
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: [],
        wishlistCount: 0
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fashionCart');
    const savedWishlist = localStorage.getItem('fashionWishlist');
    
    if (savedCart || savedWishlist) {
      dispatch({
        type: 'LOAD_FROM_STORAGE',
        payload: {
          cart: savedCart ? JSON.parse(savedCart) : [],
          wishlist: savedWishlist ? JSON.parse(savedWishlist) : []
        }
      });
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fashionCart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('fashionWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const cartItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
      cartId: `${product.id}-${selectedColor}-${selectedSize}`
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartId });
  };

  const updateCartItemQuantity = (cartId, quantity) => {
    dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { cartId, quantity } });
  };

  const toggleWishlist = (productId) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const calculateCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const isInWishlist = (productId) => {
    return state.wishlist.includes(productId);
  };

  const value = {
    cart: state.cart,
    wishlist: state.wishlist,
    cartCount: state.cartCount,
    wishlistCount: state.wishlistCount,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    toggleWishlist,
    removeFromWishlist,
    clearCart,
    clearWishlist,
    calculateCartTotal,
    isInWishlist
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 