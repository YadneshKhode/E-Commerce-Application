// import React from "react";
// import { Route } from "react-router-dom";

// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionPage from "../collection/collection.component";

// const ShopPage = ({ match }) => (
//   <div className="shop-page">
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

// export default ShopPage;
import React from "react";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { Route } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
