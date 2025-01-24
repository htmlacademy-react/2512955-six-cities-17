import { Classed } from '@shared/types';
import classNames from 'classnames';
import { ReactNode } from 'react';

type SpinnerProps = Classed<{
  isActive: boolean;
}>

export function Spinner({ className, isActive }: SpinnerProps): ReactNode {
  const spinnerClassName = classNames('loader-spin', className);
  return isActive ? <div className={spinnerClassName} data-testid='spinner' /> : undefined;
}
