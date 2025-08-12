import type { State, AppDispatch } from './types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setMedia } from './store/action';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useMedia = () => {
  const mob: MediaQueryList = window.matchMedia('(max-width: 1023px)');
  const dispatch = useAppDispatch();
  dispatch(setMedia(mob.matches));

  const onMOb = () => {
    dispatch(setMedia(mob.matches));
    // eslint-disable-next-line no-console
    console.log(123);
  };

  mob.addEventListener('change', onMOb);
};
