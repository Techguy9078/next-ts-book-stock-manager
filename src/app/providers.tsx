// app/providers.tsx
'use client';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import BookCountProvider from './BookCountContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BookCountProvider>
          {children}
          <Toaster
            className={'h-1'}
            richColors
            position="top-right"
            expand={true}
          />
        </BookCountProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
