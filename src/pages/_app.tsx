import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import toasterOptions from "@/utils/client/toasterOptions";
import useAuthStore from "@/store/userStore";
import React, { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { setUser } = useAuthStore();

  // This pattern is very important if you are using queryclient
  // on SSR. Its suggested by the docs. Don't make a singleton
  // pattern for the queryClient, otherwise the all api calls will
  // read and write the same cache. It can cause issues such as:
  // User B could see data that User A fetched a second ago
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    if (pageProps.user) {
      setUser(pageProps.user);
    }
  }, [pageProps.user, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
          <Toaster {...toasterOptions} />
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
