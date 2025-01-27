import { Helmet } from 'react-helmet-async';
import { ComponentType, FC } from 'react';

type BasePropsType = Partial<Record<string, unknown>>;

export function componentWithBrowserTitle<TPropsType extends BasePropsType>(Component: ComponentType<TPropsType>, title: string) {
  const ReturnedComponent: FC<TPropsType> = (props: TPropsType) => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Component {...props} />
    </>
  );
  ReturnedComponent.displayName = `${Component?.displayName ?? 'component'}WithHelmet`;

  return ReturnedComponent;
}
