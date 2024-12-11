import { OfferHost } from '@entities/offer';
import { ElementSize } from '@shared/types';
import { PropsWithChildren } from 'react';
import { Avatar } from '@shared/ui/avatar';

type OfferHostInfoProps = PropsWithChildren<{
  host: OfferHost;
}>

const AVATAR_SIZE: ElementSize = {
  width: 74,
  height: 74
};

export function OfferHostInfo({ host, children }: OfferHostInfoProps) {
  return (
    <div className='offer__host'>
      <h2 className='offer__host-title'>Meet the host</h2>
      <div className='offer__host-user user'>
        <Avatar
          alt='Host avatar'
          avatarUrl={host.avatarUrl}
          imageSize={AVATAR_SIZE}
          description={host.name}
          isPro={host.isPro}
          type='offer'
        />
        {host.isPro && (
          <span className='offer__user-status'>
            Pro
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
