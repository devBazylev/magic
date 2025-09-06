import type { State, AppDispatch } from './types';
import { useEffect, useCallback, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setMedia, setOverlay } from './store/site-process/site-process';
import { setFavoritesStore } from './store/action';
import { getFavoritesStore } from './store/site-data/selectors';
import { saveFavorites } from './utils';
import { RefObject } from 'react';

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

export const useClickOutsideAndEscape = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  flag: boolean = false
) => {
  useEffect(() => {
    if (!flag) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
};


export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavoritesStore);
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const saveFavoritesMemo = useCallback((favoritesList: number[]) => {
    saveFavorites(favoritesList);
  }, []);

  const toggleFavorite = useCallback((cardId: number) => {
    const newFavorites = favoritesSet.has(cardId)
      ? favorites.filter((favId: number) => favId !== cardId)
      : [...favorites, cardId];

    dispatch(setFavoritesStore(newFavorites));
    saveFavoritesMemo(newFavorites);
  }, [favorites, favoritesSet, dispatch, saveFavoritesMemo]);

  const addToFavorites = useCallback((cardId: number) => {
    if (!favoritesSet.has(cardId)) {
      const newFavorites = [...favorites, cardId];
      dispatch(setFavoritesStore(newFavorites));
      saveFavoritesMemo(newFavorites);
    }
  }, [favorites, favoritesSet, dispatch, saveFavoritesMemo]);

  const removeFromFavorites = useCallback((cardId: number) => {
    if (favoritesSet.has(cardId)) {
      const newFavorites = favorites.filter((favId: number) => favId !== cardId);
      dispatch(setFavoritesStore(newFavorites));
      saveFavoritesMemo(newFavorites);
    }
  }, [favorites, favoritesSet, dispatch, saveFavoritesMemo]);

  const isFavorite = useCallback((cardId: number) => favoritesSet.has(cardId), [favoritesSet]);

  return {
    favorites,
    favoritesSet,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
