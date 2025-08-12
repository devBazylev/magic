import { useEffect } from 'react';
import type { State, AppDispatch } from './types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setMedia } from './store/action';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useMedia = () => {
  const mob: MediaQueryList = window.matchMedia('(min-width: 0px) and (max-width: 1023px)');
  const dispatch = useAppDispatch();

  const handleMediaChange = () => {
    if (mob.matches) {
      dispatch(setMedia(true));
    } else {
      dispatch(setMedia(false));
    }
  };

  useEffect(() => {
    dispatch(setMedia(mob.matches));

    mob.addEventListener('change', handleMediaChange);
  });
};
