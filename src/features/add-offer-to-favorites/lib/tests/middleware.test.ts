import { createAddToFavoriteMiddleware } from '../middleware';
import { changeFavoriteAction, ChangeFavoriteActionPayload } from '../change-favorite-action';
import { AppThunkDispatch, emptyAction } from '@test-utills/mock/redux';
import { Action, createAction } from '@reduxjs/toolkit';
import { UnionOfferInfo } from '@entities/offer';
import { configureMockStore } from '@jedmao/redux-mock-store';
import faker from 'faker';
import { generatePath } from 'react-router-dom';
import { ServerRoutesEnum } from '@shared/types';
import { RootState } from '@shared/lib/store';
import { createUnionOfferInfoMock } from '@test-utills/mock/offer';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const FAKE_UPDATE_ACTIONS_COUNT = 3;
const FAKE_UPDATE_OFFER_ACTION_TYPE = 'fake/updateOffer';
const FAKE_LOADING_ACTION_TYPE = 'fake/setLoading';
const fakeUpdateActionCreator = createAction<UnionOfferInfo>(FAKE_UPDATE_OFFER_ACTION_TYPE);
const fakeSetLoadingActionCreator = createAction<boolean>(FAKE_LOADING_ACTION_TYPE);

const generateFakeUpdateActionCreators = (creatorsCount: number) =>
  Array.from({length: creatorsCount}).map(() => fakeUpdateActionCreator);

const createChangeToFavoriteActionPayloadMock = (): ChangeFavoriteActionPayload => ({
  offerId: faker.datatype.uuid(),
  isFavorite: faker.datatype.boolean()
});

describe('Add to favorites offer middleware', () => {
  const updateActionCreators = generateFakeUpdateActionCreators(FAKE_UPDATE_ACTIONS_COUNT);
  const axiosInstance = axios.create();
  const axiosMockAdapter = new AxiosMockAdapter(axiosInstance);
  const middlewareNextArgMock = vi.fn();
  const addToFavoriteMiddleware = createAddToFavoriteMiddleware(
    axiosInstance,
    fakeSetLoadingActionCreator,
    updateActionCreators
  );

  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([addToFavoriteMiddleware]);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  it('not works by empty action', async () => {
    const spyedAxiosPost = vi.spyOn(axiosInstance, 'post');

    await addToFavoriteMiddleware(store)(middlewareNextArgMock)(emptyAction);

    expect(spyedAxiosPost).not.toBeCalled();
  });

  it('not works by not "changeFavoriteAction"', async () => {
    const otherAction: Action<string> = {
      type: 'otherAction'
    };
    const spyedAxiosPost = vi.spyOn(axiosInstance, 'post');

    await addToFavoriteMiddleware(store)(middlewareNextArgMock)(otherAction);

    expect(spyedAxiosPost).not.toBeCalled();
  });

  describe('by "changeFavoriteAction"', () => {
    it('should dispatch "setLoadingAction" twice', async () => {
      const changeToFavoriteActinPayload = createChangeToFavoriteActionPayloadMock();
      const responceOffer = createUnionOfferInfoMock();
      const changeFavoriteUrl = generatePath(ServerRoutesEnum.FavoriteChange, {
        offerId: changeToFavoriteActinPayload.offerId,
        status: `${Number(changeToFavoriteActinPayload.isFavorite)}`
      });
      axiosMockAdapter.onPost(changeFavoriteUrl).replyOnce(200, responceOffer);

      await addToFavoriteMiddleware(store)(middlewareNextArgMock)(changeFavoriteAction(changeToFavoriteActinPayload));

      const setLoadingActions = store.getActions().filter((current) => current.type === FAKE_LOADING_ACTION_TYPE);

      expect(setLoadingActions.length).toBe(2);
    });

    it('should dispatch update actions if query success', async () => {
      const changeToFavoriteActinPayload = createChangeToFavoriteActionPayloadMock();
      const responceOffer = createUnionOfferInfoMock();
      const changeFavoriteUrl = generatePath(ServerRoutesEnum.FavoriteChange, {
        offerId: changeToFavoriteActinPayload.offerId,
        status: `${Number(changeToFavoriteActinPayload.isFavorite)}`
      });
      axiosMockAdapter.onPost(changeFavoriteUrl).replyOnce(200, responceOffer);
      await addToFavoriteMiddleware(store)(middlewareNextArgMock)(changeFavoriteAction(changeToFavoriteActinPayload));

      const result = store.getActions().filter((current) => current.type === FAKE_UPDATE_OFFER_ACTION_TYPE);

      expect(result.length).toBe(FAKE_UPDATE_ACTIONS_COUNT);
    });

    it('should not dispatch update actions if query failed', async () => {
      const changeToFavoriteActinPayload = createChangeToFavoriteActionPayloadMock();
      const changeFavoriteUrl = generatePath(ServerRoutesEnum.FavoriteChange, {
        offerId: changeToFavoriteActinPayload.offerId,
        status: `${Number(changeToFavoriteActinPayload.isFavorite)}`
      });
      axiosMockAdapter.onPost(changeFavoriteUrl).replyOnce(404);
      await addToFavoriteMiddleware(store)(middlewareNextArgMock)(changeFavoriteAction(changeToFavoriteActinPayload));

      const result = store.getActions().filter((current) => current.type === FAKE_UPDATE_OFFER_ACTION_TYPE);

      expect(result.length).toBe(0);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
