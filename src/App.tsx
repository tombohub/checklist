import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./ui/chakraTheme";
import Main from "./components/Main";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    </>
  );
}

export default App;
