export enum ServerRoutesEnum {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  FullOffer = '/offers/:id',
  NearOffers = '/offers/:id/nearby',
  Reviews = '/comments/:offerId'
}
