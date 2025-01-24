import { offersListReducer, updateOffer } from './offers-info-slice';
import { fetchOffersList } from './actions';
import { offersListSelector, offersLoadingSelector } from './selectors';

export {
  offersListReducer,
  fetchOffersList,
  offersListSelector,
  updateOffer,
  offersLoadingSelector
};
