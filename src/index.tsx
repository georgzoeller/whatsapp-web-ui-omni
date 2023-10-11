import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import GlobalStyle from "global-styles";
import AppThemeProvider from "common/theme";
import { MainPageLoader } from "common/components/loader";
import {OmniSDKClient} from 'omni-sdk';
const sdk = new OmniSDKClient("omni-extension-wa-chat-ui").init();
interface MyWindow extends Window {
  omniSDK: any;
}
declare var window: MyWindow;

window.omniSDK = globalThis.omniSDK = sdk;

console.error(window.omniSDK)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppThemeProvider>
    <GlobalStyle />
    <Suspense fallback={<MainPageLoader />}>
      <App />
    </Suspense>
  </AppThemeProvider>
);
