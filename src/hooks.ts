import { useEffect } from 'react';
import type { State, AppDispatch } from './types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setMedia, setOverlay } from './store/site-process/site-process';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useMedia = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mob: MediaQueryList = window.matchMedia('(max-width: 1023px)');
    dispatch(setMedia(mob.matches));

    const onMOb = () => {
      dispatch(setMedia(mob.matches));
    };

    mob.addEventListener('change', onMOb);

    return () => {
      mob.removeEventListener('change', onMOb);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useOverlay = (flag: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOverlay(flag));

    return () => {
      dispatch(setOverlay(false));
    };

  }, [flag, dispatch]);
};
