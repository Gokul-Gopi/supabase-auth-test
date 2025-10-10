import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import queryClient from "@/utils/client/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
