import { useEffect } from 'react';

// eslint-disable-next-line no-console
/* eslint-disable */
// @ts-ignore

const useMedia = () => {
  const mob: MediaQueryList = window.matchMedia('(min-width: 0px) and (max-width: 1023px)');

  // const isMob = () => {
  //   console.log(123);
  // };

  const onDoc = () => {
    // isMob();
    // mob.addEventListener('change', isMob);
    if (mob.matches) {
      console.log(123);
    }

    console.log(123);
  };

  useEffect(onDoc, [mob]);
};

export default useMedia;
