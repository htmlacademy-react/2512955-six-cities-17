import Layout from '@widgets/layout';
import { LoginForm } from '@features/login-form';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { Link } from 'react-router-dom';
import { RoutesEnum } from '@shared/types';
import { OfferCityName } from '@entities/offer';
import { useAuthorization } from '@entities/user';
import { useEffect } from 'react';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';

const PAGE_TITLE = '6 cities: authorization';
const DEFAULT_CITY: OfferCityName = 'Amsterdam';

function LoginPage(): JSX.Element {
  const { login, loading } = useAuthorization();
  const { setLoading } = useGlobalLoader();

  useEffect(
    () => {
      let componentIsRendered = false;
      if (!componentIsRendered) {
        setLoading(loading);
      }

      return () => {
        componentIsRendered = true;
      };
    },
    [loading, setLoading]
  );

  return (
    <Layout className='page--gray page--login'>
      <Layout.Header />
      <Layout.Content className='page__main--login'>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm onSubmit={login}/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`${RoutesEnum.Main}?activeCity=${DEFAULT_CITY}`}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export const LoginPageWithBrowserTitle = componentWithBrowserTitle(LoginPage, PAGE_TITLE);
