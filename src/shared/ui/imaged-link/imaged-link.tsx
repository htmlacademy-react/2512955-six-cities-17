import { Link, LinkProps} from 'react-router-dom';
import { ComponentPropsWithoutRef, ElementType } from 'react';

type LinkOwnProps = {
  linkConfig: LinkProps;
};


const imageElement = 'img';

type ElementProps<TElementType extends ElementType = typeof imageElement> = Omit<ComponentPropsWithoutRef<TElementType>, keyof LinkOwnProps> & LinkOwnProps;

export function ImagedLink({linkConfig, ...props}: ElementProps): JSX.Element {
  return (
    <Link {...linkConfig}>
      <img {...props}/>
    </Link>
  );
}
