import { BackPath } from '../../const';

function Back({path}: {path: BackPath}): JSX.Element {
  const selectPath = (): string => {
    switch (path) {
      case BackPath.Root:
        return 'main';
      case BackPath.Login:
        return 'gate';
      case BackPath.Error:
        return 'volcano';
      default:
        return 'volcano';
    }
  };
  return (
    <div className="back">
      <picture>
        <source type="image/webp" media="(min-width: 1024px)" srcSet={`${import.meta.env.BASE_URL}img/${selectPath()}-l@1x.webp, ${import.meta.env.BASE_URL}img/${selectPath()}-l@2x.webp 2x`} />
        <source type="image/jpg" media="(min-width: 1024px)" srcSet={`${import.meta.env.BASE_URL}img/${selectPath()}-l@1x.jpg, ${import.meta.env.BASE_URL}img/${selectPath()}-l@2x.jpg 2x`} />
        <source type="image/webp" srcSet={`${import.meta.env.BASE_URL}img/${selectPath()}-s@1x.webp, ${import.meta.env.BASE_URL}img/${selectPath()}-s@2x.webp 2x`} />
        <img className="back__img" src={`${import.meta.env.BASE_URL}img/${selectPath()}-s@1x.jpg`} srcSet={`${import.meta.env.BASE_URL}img/${selectPath()}-s@2x.jpg 2x`} alt="Background." loading="lazy" />
      </picture>
    </div>
  );
}

export default Back;
