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
