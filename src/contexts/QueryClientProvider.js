import React from 'react';
// Importa os componentes do TanStack Query
import { QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query';

// Cria uma instância do QueryClient (que controla o cache, etc.)
const queryClient = new QueryClient();

// Este componente wrapper vai envolver nossa aplicação,
// permitindo que qualquer componente filho use o TanStack Query.
export default function QueryClientProvider({ children }) {
  return (
    <TanstackProvider client={queryClient}>
      {children}
    </TanstackProvider>
  );
}