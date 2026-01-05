import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";
import axios from "axios";
import { getAllProducts, getOneProduct } from "../services/product";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    dispatch({ type: "SET_LOADING" });

    try {
      const list = await getAllProducts();
      dispatch({ type: "SET_API_DATA", payload: list });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (id) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const single = await getOneProduct(id);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: single });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  const addProduct = (product) => {
    const auth = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    return axios
      .post("/api/admin/products", product, {
        headers: { authorization: "Bearer " + auth.accessToken },
      })
      .then(() => getProducts());
  };

  const updateProduct = (id, updates) => {
    const auth = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    return axios
      .put(`/api/admin/products/${id}`, updates, {
        headers: { authorization: "Bearer " + auth.accessToken },
      })
      .then(() => getProducts());
  };

  const deleteProduct = (id) => {
    const auth = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    return axios
      .delete(`/api/admin/products/${id}`, {
        headers: { authorization: "Bearer " + auth.accessToken },
      })
      .then(() => getProducts());
  };

  const addProductsBulk = (products, defaultDiscountPercent) => {
    const auth = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    return axios
      .post(
        "/api/admin/products/bulk",
        { products, defaultDiscountPercent },
        {
          headers: { authorization: "Bearer " + auth.accessToken },
        }
      )
      .then(() => getProducts());
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getSingleProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        addProductsBulk,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//!Custom Hook

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
