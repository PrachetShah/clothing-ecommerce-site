import { ReactComponent as ShoppingComponent } from "../../assets/shopping-bag.svg";

import { useContext } from "react";
import { CartToggleContext } from "../../contexts/cart-toggle.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartToggleContext);

  const toggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon-container" onClick={toggle}>
      <ShoppingComponent className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
