import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "../layouts/AppLayout";
import { ThemeProvider } from "next-themes";

// Bir QueryClient örneği oluşturma
const queryClient = new QueryClient();

// React-Query desteği için Uygulama bileşenini QueryClientProvider bileşeniyle sarın
// ve düzenimiz için uygulama bileşeni (gezinme çubuğu, altbilgi vb.)
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
