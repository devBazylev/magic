import { memo, useMemo } from 'react';
import { BackPath } from '../../const';

function Back({path}: {path: BackPath}): JSX.Element {
  const imageName = useMemo(() => path || 'volcano', [path]);
  const baseUrl = useMemo(() => import.meta.env.BASE_URL, []);

  const imageSources = useMemo(() => ({
    webpLarge: `${baseUrl}img/${imageName}-l@1x.webp, ${baseUrl}img/${imageName}-l@2x.webp 2x`,
    jpgLarge: `${baseUrl}img/${imageName}-l@1x.jpg, ${baseUrl}img/${imageName}-l@2x.jpg 2x`,
    webpSmall: `${baseUrl}img/${imageName}-s@1x.webp, ${baseUrl}img/${imageName}-s@2x.webp 2x`,
    jpgSmall: `${baseUrl}img/${imageName}-s@1x.jpg`,
    jpgSmallSrcSet: `${baseUrl}img/${imageName}-s@2x.jpg 2x`,
  }), [baseUrl, imageName]);

  return (
    <div className="back">
      <picture>
        <source type="image/webp" media="(min-width: 1024px)" srcSet={imageSources.webpLarge} />
        <source type="image/jpg" media="(min-width: 1024px)" srcSet={imageSources.jpgLarge} />
        <source type="image/webp" srcSet={imageSources.webpSmall} />
        <img className="back__img" src={imageSources.jpgSmall} srcSet={imageSources.jpgSmallSrcSet} alt="Background." loading="lazy" />
      </picture>
    </div>
  );
}

export const MemoizedBack = memo(Back);
