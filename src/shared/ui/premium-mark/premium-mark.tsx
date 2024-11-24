import { Classed } from '@shared/types';

type PremiumMarkProps = Classed<{
  markText?: string;
}>

export function PremiumMark({ className = 'place-card__mark', markText = 'Premium' }: PremiumMarkProps): JSX.Element {
  return (
    <div className={className}>
      <span>{ markText }</span>
    </div>
  );
}
