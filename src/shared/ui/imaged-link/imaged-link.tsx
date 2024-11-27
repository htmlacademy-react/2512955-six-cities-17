import { Link, LinkProps} from 'react-router-dom';
import { ComponentPropsWithoutRef, ElementType } from 'react';

type LinkOwnProps = Pick<LinkProps, 'to'>;

const imageElement = 'img';

type ElementProps<TElementType extends ElementType = typeof imageElement> = Omit<ComponentPropsWithoutRef<TElementType>, keyof LinkOwnProps> & LinkOwnProps;

export function ImagedLink({to, ...props}: ElementProps): JSX.Element {
  return (
    <Link to={to}>
      <img {...props}/>
    </Link>
  );
}
