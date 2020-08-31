import React, { useContext } from "react";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon
} from "../../components/icons";
import { CartContext } from "../../contexts/CartContext";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import { formatNumber } from "../../helpers/utils";
import DeleteIcon from "@material-ui/icons/Delete";

const CartItem = ({ product }) => {
  const { increase, decrease, removeProduct } = useContext(CartContext);

  return (
    <div className="row no-gutters py-2">
      <div className="col-sm-2 p-2">
        <img
          alt={product.name}
          style={{ margin: "0 auto", maxHeight: "50px" }}
          src={product.photo}
          className="img-fluid d-block"
        />
      </div>
      <div className="col-sm-4 p-2">
        <h5 className="mb-1">{product.name}</h5>
        <p className="mb-1">Price: {formatNumber(product.price)} </p>
      </div>
      <div className="col-sm-2 p-2 text-center ">
        <p className="mb-0">Qty: {product.quantity}</p>
      </div>
      <div className="col-sm-4 p-2 text-right">
        <IconButton aria-label="delete" onClick={() => increase(product)}>
          <AddCircleOutlinedIcon />
        </IconButton>

        {product.quantity > 1 && (
          <IconButton aria-label="delete" onClick={() => decrease(product)}>
            <RemoveCircleIcon />
          </IconButton>
        )}

        {product.quantity === 1 && (
          <IconButton
            aria-label="delete"
            onClick={() => removeProduct(product)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default CartItem;
