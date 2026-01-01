import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";
import data from "../../products.json";

const AppContext = createContext();

const API = data;

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

  const getProducts = async (productsData) => {
    dispatch({ type: "SET_LOADING" });

    try {
      // const data = await getAllProducts();
      // const res = await axios.get(url);
      // const products = res.data;
      dispatch({ type: "SET_API_DATA", payload: productsData });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (id) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      // const singleProduct = await getOneProduct(id);
      const singleProduct = API.find((curElem) => curElem.id === id);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

//!Custom Hook

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
