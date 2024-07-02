import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

// initalise context, right now we dont have DB to update data, so we have not created a setProduct in context
export const ProductsContext = createContext({
  products: [],
});

// this is the actual functional component, which has to be added in "index.js"
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  // for every context that gets build for us, there is a provider
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
