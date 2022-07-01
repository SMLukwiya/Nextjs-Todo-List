import {QueryClientProvider, QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {useRef} from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const client = useRef(new QueryClient());

  return (
    <QueryClientProvider client={client.current}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

/*
  TODO
  Add TailwindCss
*/

export default MyApp
