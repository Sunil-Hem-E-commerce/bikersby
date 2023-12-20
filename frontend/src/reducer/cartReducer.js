const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let { id, color, qty, product } = action.payload;

      //! Tackle the existing products
      let existingProduct = state.cart.find(
        (curItem) => curItem.id === id + color
      );

      if (existingProduct) {
        let updatedProduct = state.cart.map((curItem) => {
          if (curItem.id === id + color) {
            let newQty = curItem.qty + qty;

            if (newQty >= curItem.max) {
              newQty = curItem.max;
            }
            return {
              ...curItem,
              qty: newQty,
            };
          } else {
            return curItem;
          }
        });

        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          qty,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    }

    case "SET_DECREMENT": {
      let updatedProductDec = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decQty = curElem.qty - 1;

          if (decQty <= 1) {
            decQty = 1;
          }

          return {
            ...curElem,
            amount: decQty,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProductDec,
      };
    }

    case "SET_INCREMENT": {
      let updatedProductInc = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incQty = curElem.qty + 1;

          if (incQty >= curElem.max) {
            incQty = curElem.max;
          }

          return {
            ...curElem,
            amount: incQty,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProductInc,
      };
    }

    case "REMOVE_ITEM": {
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    // case "CART_TOTAL_ITEM": {
    //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
    //     let { amount } = curElem;
    //     initialVal = initialVal + amount;
    //     return initialVal;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_item: updatedItemVal,
    //   };
    // }

    // case "CART_TOTAL_PRICE": {
    //   let total_price = state.cart.reduce((initialVal, curElem) => {
    //     let { price, amount } = curElem;
    //     initialVal += price * amount;
    //     return initialVal;
    //   }, 0);
    //   return {
    //     ...state,
    //     total_price,
    //   };
    // }

    //! Combined "CART_TOTAL_ITEM" and "CART_TOTAL_PRICE" using single reduce function

    case "CART_ITEM_PRICE_TOTAL": {
      let { total_item, total_price } = state.cart.reduce(
        (accum, curElem) => {
          let { price, qty } = curElem;
          accum.total_item += qty;
          accum.total_price += price * qty;

          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return {
        ...state,
        total_item,
        total_price,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
