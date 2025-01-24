import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import type { OfferPageState } from './types';
import { redirectToRouteAction, type AppDispatch } from '@shared/lib/store';
import type { AxiosError, AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { RoutesEnum, ServerRoutesEnum } from '@shared/types';
import { FullOfferInfo, MainOfferInfo } from '@entities/offer';
import { StatusCodes } from 'http-status-codes';
import { NewReviewData, Review } from '@entities/review';

const MAX_NEAR_OFFERS_COUNT = 3;

export const fetchOfferPageAction = createAsyncThunk<
  OfferPageState,
  string,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
    rejectValue: SerializedError;
  }
>('offerPage/getData',
  async (offerId, { dispatch, extra: apiInstance }) => {
    const offerInfoUrl = generatePath(ServerRoutesEnum.FullOffer, { id: offerId });
    const nearOffersUrl = generatePath(ServerRoutesEnum.NearOffers, { id: offerId });
    const reviewsUrl = generatePath(ServerRoutesEnum.Reviews, { offerId });
    const result: OfferPageState = {
      offer: null,
      comments: [],
      nearOffers: [],
      error: null,
      loading: false,
    };

    try {
      const { data } = await apiInstance.get<FullOfferInfo>(offerInfoUrl);
      result.offer = data;
    } catch (err) {
      const typedError: AxiosError = err as AxiosError;

      if (typedError?.response?.status === StatusCodes.NOT_FOUND.valueOf()) {
        dispatch(redirectToRouteAction({ route: RoutesEnum.NotExists, replace: true }));
      }

      throw typedError;
    }

    const [
      { data: nearOffers },
      { data: reviews }
    ] = await Promise.all([
      apiInstance.get<MainOfferInfo[]>(nearOffersUrl),
      apiInstance.get<Review[]>(reviewsUrl)
    ]);

    result.comments = reviews;
    result.nearOffers = nearOffers.slice(0, MAX_NEAR_OFFERS_COUNT);

    return result;
  }
);

export const addNewReviewAction = createAsyncThunk<
  Review,
  {
    offerId: string;
    reviewData: NewReviewData;
  },
  {
    extra: AxiosInstance;
  }
>('offerPage/addNewReview',
  async (data, { extra: apiInstance }) => {
    const addReviewUrl = generatePath(ServerRoutesEnum.Reviews, {offerId: data.offerId});
    const body = {
      comment: data.reviewData.review,
      rating: data.reviewData.rating,
    };
    const { data: newReview } = await apiInstance.post<Review>(addReviewUrl, body);
    return newReview;
  }
);
