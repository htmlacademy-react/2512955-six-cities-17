export function NoPlacesSection(): JSX.Element {
  return (
    <section className='favorites favorites--empty' data-testid='favorites-list-empty-text'>
      <h1 className='visually-hidden'>Favorites (empty)</h1>
      <div className='favorites__status-wrapper'>
        <b className='favorites__status'>Nothing yet saved.</b>
        <p className='favorites__status-description'>Save properties to narrow down search or plan your future trips.</p>
      </div>
    </section>
  );
}
