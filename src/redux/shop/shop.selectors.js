import { createSelector } from "reselect";
import memoize from "lodash.memoize";
const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => (collections ? Object.values(collections) : [])
);
//return empty array if collection is null line 12
//138,143
//convert object to array ( we converted to object because of O(1) retrieval time of data but other selectors are expecting array so converting here)
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
