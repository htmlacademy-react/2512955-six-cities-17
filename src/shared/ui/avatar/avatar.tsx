import type { ElementSize } from '@shared/types';
import { getAvatarStyles } from './utils';
import type { AvatarType } from './types';

type AvatarProps = {
  description?: string;
  avatarUrl: string;
  imageSize: ElementSize;
  alt: string;
  isPro: boolean;
  type: AvatarType;
}

export function Avatar({ alt, avatarUrl, description, imageSize, isPro, type }: AvatarProps): JSX.Element {
  const styles = getAvatarStyles(isPro, type);
  return (
    <>
      <div className={styles.wrapperStyles}>
        <img className={styles.imgStyles} src={avatarUrl} width={imageSize.width} height={imageSize.height} alt={alt} />
      </div>
      {description && (
        <span className={styles.spanStyles}>
          {description}
        </span>
      )}
    </>
  );
}
