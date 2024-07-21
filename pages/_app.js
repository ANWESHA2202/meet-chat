import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
queryClient.setQueryData("isModalOpen", false);

export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {!isMounted ? (
        <></>
      ) : (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      )}
    </>
  );
}
