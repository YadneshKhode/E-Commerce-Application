import React from "react";

import CollectionItem from "../collection-item/collection-item.component";
import { Link, withRouter } from "react-router-dom";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, match }) => (
  <div className="collection-preview wrapper">
    <h1 className="title">
      <Link to={`${match.path}/${title.toLowerCase()}`}>{title.toUpperCase()}</Link>
    </h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
