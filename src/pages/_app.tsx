import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import { Roboto_Condensed } from 'next/font/google';
import '~/styles/globals.css';

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: 'normal',
  subsets: ['latin'],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={robotoCondensed.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
