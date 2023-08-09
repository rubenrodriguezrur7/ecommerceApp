import { useState } from 'react'
import { useUpdateCart } from '../../../hooks/queries/useUpdateCart';
import { useSelector } from 'react-redux';
import { useDeleteProductFromCart } from "../../../hooks/queries/useDeleteProductFromCart";

import "./CartProduct.css";

const CartProduct = ({ cartProduct }) => {
  const initialQuantity = Number(cartProduct.quantity);
  const price = Number(cartProduct.product.price);
  const { mutate, isLoading } = useUpdateCart();
  const deleteMutation = useDeleteProductFromCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const isLogged = useSelector((store) => store.auth.isLogged);

  const increment = () => {
    const newQuantity = quantity + 1;
    const stock = 10;
    if(newQuantity <= stock) setQuantity(newQuantity);
  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleUpdate = () => {
    if(isLogged)
      mutate({ cartProductId: cartProduct.id, newQuantity: quantity });
  };

  const handleDelete = () => {
    if (isLogged) deleteMutation.mutate(cartProduct.id);
  };

  return (
    <article className="cart-product">
      <div className="cart-product_img">
        <img
          src={cartProduct.product.images[0].url}
          alt={cartProduct.product.title}/>
      </div>

      <div className="cart-product_detail">
        <header className="cart-product_header">
          <h4 className="cart-product_title">{cartProduct.product.title}</h4>
          <button className="cart-product_btn" 
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}>
            <i className="bx bx-trash"></i>
          </button>
        </header>

        <div className="cart-product_controls-container">
          <div className="cart-product_controls">
            <button className="cart-product_btns" onClick={decrement}>-</button>
            <span>{quantity}</span>
            <button className="cart-product_btns" onClick={increment}>+</button>
          </div>

          {initialQuantity !== quantity && (
            <button className="cart-product_update-btn" onClick={handleUpdate} disabled={isLoading}>
              Update Cart
            </button>
          )}
        </div>

        <div className="cart-product_total-container">
          <h5>Total:</h5>
          <p><em>$ {(initialQuantity * price).toFixed(2)}</em></p>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;