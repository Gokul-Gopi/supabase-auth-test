import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import queryClient from "@/utils/client/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import toasterOptions from "@/utils/client/toasterOptions";
import useAuthStore from "@/store/userStore";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    console.log("effect ran");
    if (pageProps.user) {
      setUser(pageProps.user);
    }
  }, [pageProps.user, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
        <Toaster {...toasterOptions} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
