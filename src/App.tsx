import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./ui/chakraTheme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Checklist from "./components/Checklist";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:uid" element={<Checklist />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
