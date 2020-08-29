import React from "react";

import SavedItemsGrid from "./SavedItemsGrid";

const Store = () => {
  return (
    <div>
      <div className="text-center mt-5">
        <h1>Store</h1>
        <p>This is the Saved Items Page.</p>
      </div>
      <SavedItemsGrid />
    </div>
  );
};

export default Store;
