import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserContextProvider } from "../app/store/userContext";
import { Auth } from "../app/store/auth";



function MyApp({ Component, pageProps }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
