import { useState } from "react";
import { ChakraProvider, Switch, Text } from "@chakra-ui/react";

import Root from "./app/Root";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChakraProvider>
        <Root />
      </ChakraProvider>
    </>
  );
}

export default App;
