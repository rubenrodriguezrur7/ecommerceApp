import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useAddProductToCart } from "../../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";

const ProductCard = ({ product }) => {
  const { mutate } = useAddProductToCart();
  const { data, isLoading } = useCart();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const navigate = useNavigate();

  const isProductInCart = data?.some( 
    (cartProduct) => cartProduct.productId === product.id
  );

  const isAddVisible = !isLogged || !isProductInCart;

  const handleAdd = (e) => {
    e.preventDefault();

    if (!isLogged) navigate("/login");
    else mutate({ quantity: 1, productId: product.id });
};

  return (
    <Link to={"/product/" + product.id} className="link">     
      <article className="product-cart">
        <header className="product-cart_header">
          <div className="product-cart_container-img">
            <img src={product.images[0]?.url} alt={product.title + "image 1"} className="product-cart_img product-cart_container-img--visible"/>
            <img src={product.images[1]?.url} alt={product.title + "image 2"} className="product-cart_img product-cart_container-img--hidden"/>
          </div>

          <p className="product-cart_paragraph">{product.brand}</p>
          <h2 className="product-title">{product.title}</h2>
        </header>

        <section className="product-cart_body">
          <h3 className="product-cart_paragraph">Price</h3>
          <p className="product-title">
            <em>$ {product.price}</em>
          </p>
        </section>

        {isAddVisible && (
          <button
            className="product-cart_btn"
            onClick={handleAdd}
            disabled={isLoading}>
            <i className='bx bxs-cart-add'></i>
          </button>
        )}

        {!isAddVisible && <p>Ya tienes este producto en el carrito</p>}
      </article>
    </Link>
  );
};

export default ProductCard;