import { Action } from '@reduxjs/toolkit';

export const extractActionsTypes = <TActionType = string>(actions: Action<TActionType>[]) => actions.map((current) => current.type);

export const isActionsEquals = <TActionType = string>(actions: Action<TActionType>[], expectedActions: Action<TActionType>[]): boolean => {
  if (actions.length === expectedActions.length) {
    const actionsTypes = extractActionsTypes(actions);
    let expectedActionsTypes = extractActionsTypes(expectedActions);

    actionsTypes.forEach((currentAction) => {
      expectedActionsTypes = expectedActionsTypes.filter((currentExpected) => currentExpected !== currentAction);
    });

    return expectedActionsTypes.length === 0;
  }

  return false;
};

export const isActionsContains = <TActionType = string>(actions: Action<TActionType>[], expectedActions: Action<TActionType>[]): boolean => {
  if (expectedActions.length === 0) {
    return true;
  }

  if (actions.length > 0) {
    const actionsTypes = extractActionsTypes(actions);
    const expectedActionsTypes = extractActionsTypes(expectedActions);

    return expectedActionsTypes.every(
      (expected) => !!actionsTypes.find((current) => current === expected)
    );
  }

  return false;
};
