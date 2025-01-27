import OfferPage from './ui/offer-page';
import { offerPageReducer, updateOffer } from './model/offer-page-slice';
import { offerLoadingSelector as offerPageLoadingSelector } from './model/offer-page-slice';

export { offerPageReducer, updateOffer as updatePageOffer, offerPageLoadingSelector };

export default OfferPage;
