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

  const getStoredAdminProducts = () => {
    try {
      const raw = localStorage.getItem("adminProducts");
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const applyOverrides = (productsData) => {
    try {
      const overrides = JSON.parse(
        localStorage.getItem("priceOverrides") || "{}"
      );
      if (!overrides || typeof overrides !== "object") return productsData;
      return productsData.map((p) =>
        overrides[p.id] ? { ...p, price: overrides[p.id] } : p
      );
    } catch {
      return productsData;
    }
  };

  const getProducts = async (productsData) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const adminProducts = getStoredAdminProducts();
      const base =
        adminProducts && adminProducts.length > 0
          ? adminProducts
          : productsData;
      const withOverrides = applyOverrides(base);
      dispatch({ type: "SET_API_DATA", payload: withOverrides });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (id) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const overrides = JSON.parse(
        localStorage.getItem("priceOverrides") || "{}"
      );
      const adminProducts = getStoredAdminProducts();
      const dataset =
        adminProducts && adminProducts.length > 0 ? adminProducts : API;
      const singleProductRaw = dataset.find((curElem) => curElem.id === id);
      const singleProduct = overrides[id]
        ? { ...singleProductRaw, price: overrides[id] }
        : singleProductRaw;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  const setAdminProducts = (nextProducts) => {
    try {
      localStorage.setItem("adminProducts", JSON.stringify(nextProducts));
      const withOverrides = applyOverrides(nextProducts);
      dispatch({ type: "SET_API_DATA", payload: withOverrides });
    } catch {
      // ignore
    }
  };

  const addProduct = (product) => {
    const list = getStoredAdminProducts() ?? API;
    const exists = list.find((p) => p.id === product.id);
    const next = exists
      ? list.map((p) => (p.id === product.id ? { ...p, ...product } : p))
      : [{ ...product }, ...list];
    setAdminProducts(next);
  };

  const updateProduct = (id, updates) => {
    const list = getStoredAdminProducts() ?? API;
    const next = list.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setAdminProducts(next);
  };

  const deleteProduct = (id) => {
    const list = getStoredAdminProducts() ?? API;
    const next = list.filter((p) => p.id !== id);
    setAdminProducts(next);
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getSingleProduct,
        addProduct,
        updateProduct,
        deleteProduct,
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
