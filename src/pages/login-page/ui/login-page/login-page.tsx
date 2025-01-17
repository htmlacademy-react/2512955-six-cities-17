import Layout from '@widgets/layout';
import { LoginForm } from '@features/login-form';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { RoutesEnum } from '@shared/types';
import { OfferCityName } from '@entities/offer';
import { useAuthorization } from '@entities/user';
import { LocationLink } from '../location-link';

const PAGE_TITLE = '6 cities: authorization';
const DEFAULT_CITY: OfferCityName = 'Amsterdam';

function LoginPage(): JSX.Element {
  const { login } = useAuthorization();
  return (
    <Layout className='page--gray page--login'>
      <Layout.Header showUserNavigation={false} />
      <Layout.Content className='page__main--login'>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm onSubmit={login} />
          </section>
          <LocationLink to={`${RoutesEnum.Main}?activeCity=${DEFAULT_CITY}`} caption={DEFAULT_CITY}/>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export const LoginPageWithBrowserTitle = componentWithBrowserTitle(LoginPage, PAGE_TITLE);
