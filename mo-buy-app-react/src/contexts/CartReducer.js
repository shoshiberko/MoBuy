import $ from "jquery";

const handleAddItem = (productId) => {
  var data = {
    emailAddress: sessionStorage.getItem("userEmail"),
    productId: productId,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/AddItem",
    data: data,
  })
    .done(function(data) {})
    .fail(function(jqXhr) {});
};

const handleRemoveItem = (productId) => {
  var data = {
    emailAddress: sessionStorage.getItem("userEmail"),
    productId: productId,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/RemoveItem",
    data: data,
  })
    .done(function(data) {})
    .fail(function(jqXhr) {});
};

const handleIncreaseOrDecreaseItem = (productId, incOrDec) => {
  var data = {
    emailAddress: sessionStorage.getItem("userEmail"),
    productId: productId,
    reqType: incOrDec,
  };

  // Submit form via jQuery/AJAX
  $.ajax({
    type: "POST",
    url: "/IncreaseOrDecreaseItem",
    data: data,
  })
    .done(function(data) {})
    .fail(function(jqXhr) {});
};

const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
        handleAddItem(action.payload.id);
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      handleRemoveItem(action.payload.id);
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity++;
      handleIncreaseOrDecreaseItem(action.payload.id, "increase");
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity--;
      handleIncreaseOrDecreaseItem(action.payload.id, "decrease");
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
