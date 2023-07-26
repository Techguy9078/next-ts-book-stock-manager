// app/providers.tsx
"use client";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import BookCountProvider from "./BookCountContext";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<CacheProvider>
			<ChakraProvider>
				<QueryClientProvider client={queryClient}>
					<BookCountProvider>{children}</BookCountProvider>
				</QueryClientProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
