import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from '../components/Header/Layout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (

    <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </QueryClientProvider>

  )
}

export default MyApp
