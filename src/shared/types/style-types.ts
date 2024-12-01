import type { CSSProperties } from 'react';

type ClassNamePropType = {
  className?: string;
}

type StylePropType = {
  style?: CSSProperties;
}

export type ElementSize = {
  width: number;
  height: number;
}

export type Classed<TExtendedType> = ClassNamePropType & Omit<TExtendedType, keyof ClassNamePropType>;

export type Styled<TExtendedType> = StylePropType & Omit<TExtendedType, keyof StylePropType>;

export type ClassedAndStyled<TExtendedType> = Classed<TExtendedType> & Styled<TExtendedType>;
