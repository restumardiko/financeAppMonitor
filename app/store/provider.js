"use client";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

//const persister = createSyncStoragePersister({ storage: window.localStorage });

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
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MODE === "mock") {
      import("../../mocks/browser").then(({ worker }) => {
        worker.start({
          onUnhandledRequest: "bypass",
        });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
