import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Mutate /> */}
      {/* <Request /> */}
      {/* <RquestWithLoading /> */}
    </QueryClientProvider>
  );
}

export default App;
