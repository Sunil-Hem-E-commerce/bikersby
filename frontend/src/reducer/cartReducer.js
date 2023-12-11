const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let { id, color, amount, product } = action.payload;

      //! Tackle the existing products
      let existingProduct = state.cart.find(
        (curItem) => curItem.id === id + color
      );

      if (existingProduct) {
        let updatedProduct = state.cart.map((curItem) => {
          if (curItem.id === id + color) {
            let newAmount = curItem.amount + amount;

            if (newAmount >= curItem.max) {
              newAmount = curItem.max;
            }
            return {
              ...curItem,
              amount: newAmount,
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
          amount,
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
          let decAmount = curElem.amount - 1;

          if (decAmount <= 1) {
            decAmount = 1;
          }

          return {
            ...curElem,
            amount: decAmount,
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
          let incAmount = curElem.amount + 1;

          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }

          return {
            ...curElem,
            amount: incAmount,
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
          let { price, amount } = curElem;
          accum.total_item += amount;
          accum.total_price += price * amount;

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
