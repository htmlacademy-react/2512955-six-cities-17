import { FullOfferInfo, MainOfferInfo } from '@entities/offer/model/types';
import { createUnionOfferInfoMock } from '@test-utills/mock/offer';
import { unionToFullOfferInfoAdapter, unionToMainOfferInfoAdapter } from '../union-offer-info-adapters';

describe('Union info adapters', () => {
  describe('UnionOfferInfo to MainOfferInfo adapter', () => {
    it('should return correct main offer info', () => {
      const unionOffer = createUnionOfferInfoMock();
      const expectedMainOffer: MainOfferInfo = {
        city: unionOffer.city,
        id: unionOffer.id,
        isFavorite: unionOffer.isFavorite,
        isPremium: unionOffer.isPremium,
        location: unionOffer.location,
        previewImage: unionOffer.previewImage,
        price: unionOffer.price,
        rating: unionOffer.rating,
        title: unionOffer.title,
        type: unionOffer.type,
      };

      const result = unionToMainOfferInfoAdapter(unionOffer);

      expect(result).toEqual(expectedMainOffer);
    });
  });

  describe('UnionOfferInfo to FullOfferInfo adapter', () => {
    it('should return correct full offer info', () => {
      const unionOffer = createUnionOfferInfoMock();
      const expectedFullOffer: FullOfferInfo = {
        city: unionOffer.city,
        id: unionOffer.id,
        isFavorite: unionOffer.isFavorite,
        isPremium: unionOffer.isPremium,
        location: unionOffer.location,
        price: unionOffer.price,
        rating: unionOffer.rating,
        title: unionOffer.title,
        type: unionOffer.type,
        bedrooms: unionOffer.bedrooms,
        description: unionOffer.description,
        goods: unionOffer.goods,
        host: unionOffer.host,
        images: unionOffer.images,
        maxAdults: unionOffer.maxAdults
      };

      const result = unionToFullOfferInfoAdapter(unionOffer);

      expect(result).toEqual(expectedFullOffer);
    });
  });
});
