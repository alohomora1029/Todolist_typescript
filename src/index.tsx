import { StrictMode } from "react";
import ReactDom from "react-dom";

import { App } from "./App";
import theme from "./theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

ReactDom.render(
  <StrictMode>
    <div>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ChakraProvider>
    </div>
  </StrictMode>,
  document.getElementById("root")
);
