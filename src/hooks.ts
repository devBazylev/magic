import { useEffect } from 'react';
import type { State, AppDispatch } from './types';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useMedia = () => {
  const mob: MediaQueryList = window.matchMedia('(min-width: 0px) and (max-width: 1023px)');

  const isMob = () => {
    // eslint-disable-next-line no-console
    console.log(123);
  };

  if (mob.matches) {
    isMob();
  }

  const onDoc = () => {
    mob.addEventListener('change', isMob);
  };

  useEffect(onDoc, []);
};
