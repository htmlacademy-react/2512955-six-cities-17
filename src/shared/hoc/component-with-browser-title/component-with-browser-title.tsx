import { Helmet } from 'react-helmet-async';
import { ComponentType } from 'react';

type BasePropsType = Partial<Record<string, unknown>>;

export function componentWithBrowserTitle<TPropsType extends BasePropsType>(Component: ComponentType<TPropsType>, title: string) {
  // eslint-disable-next-line react/display-name
  return (props: TPropsType): JSX.Element => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Component {...props} />
    </>
  );
}
