import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
