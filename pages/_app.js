import { ChakraProvider } from '@chakra-ui/react';

import { resetServerContext } from 'react-beautiful-dnd';
import store from '../app/store';
import { Provider } from 'react-redux';
function MyApp({ Component, pageProps }) {
  resetServerContext();
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
