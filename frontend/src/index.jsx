import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/productContext";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
// import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <Auth0Provider
  //   domain="dev-ihxzu81calx82asv.us.auth0.com"
  //   clientId="erTqIQs4M5RFB92iX43tPPLuLS8t6LEL"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin,
  //   }}
  // >
  <AppProvider>
    <FilterContextProvider>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </FilterContextProvider>
  </AppProvider>
  // </Auth0Provider>
);
