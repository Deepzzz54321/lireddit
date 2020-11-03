import "bootstrap/dist/css/bootstrap.min.css";
import "../style/custom.scss";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />;
    </Provider>
  );
}
