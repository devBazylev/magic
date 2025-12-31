import { useMemo } from 'react';
import { BackPath } from '../../const';

function Back({path}: {path: BackPath}): JSX.Element {
  const imageName = useMemo(() => path || 'volcano', [path]);

  const imageSources = useMemo(() => ({
    webpLarge: `img/${imageName}-l@1x.webp, img/${imageName}-l@2x.webp 2x`,
    jpgLarge: `img/${imageName}-l@1x.jpg, img/${imageName}-l@2x.jpg 2x`,
    webpSmall: `img/${imageName}-s@1x.webp, img/${imageName}-s@2x.webp 2x`,
    jpgSmall: `img/${imageName}-s@1x.jpg`,
    jpgSmallSrcSet: `img/${imageName}-s@2x.jpg 2x`,
  }), [imageName]);

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

export default Back;
