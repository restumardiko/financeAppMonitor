"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 2, //  data fresh 2 menit
            cacheTime: 1000 * 60 * 5, //  cache disimpan 5 menit setelah unmount
            refetchOnWindowFocus: true, //  balik ke tab → refetch
            refetchOnReconnect: true, //  internet nyambung lagi → refetch
            retry: 1, //  retry sekali kalau error
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
