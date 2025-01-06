type UserInfoProps = {
  email: string;
  favoritesCount?: number;
};

export function UserInfo({ favoritesCount = 0, email }: UserInfoProps): JSX.Element {
  return (
    <>
      <span className='header__user-name user__name'>{email}</span>
      <span className='header__favorite-count'>{favoritesCount}</span>
    </>
  );
}
