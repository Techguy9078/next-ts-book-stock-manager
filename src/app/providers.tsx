// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import BookCountProvider from "./BookCountContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<ChakraProvider
				toastOptions={{ defaultOptions: { position: "top-right" } }}
			>
				<BookCountProvider>{children}</BookCountProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
