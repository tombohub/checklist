import Main from "./components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const querClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={querClient}>
        <Main />
      </QueryClientProvider>
    </>
  );
}

export default App;
