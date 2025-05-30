import "@/styles/globals.css";
import "@/styles/todos.css";
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from "next/app";
import { Layout } from '@/components/templates/Layout';
import { useEffect } from 'react';
import { initCypressEvents } from '@/utils/testHelpers';


export default function App({ Component, pageProps }: AppProps) {
  // Initialize Cypress testing events
  useEffect(() => {
    initCypressEvents();
  }, []);
  
  return (
    <ChakraProvider>
      <Layout>       
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
