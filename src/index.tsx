import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import GlobalStyle from "global-styles";
import AppThemeProvider from "common/theme";
import { MainPageLoader } from "common/components/loader";
import {OmniSDKClient, OmniSDKHostMessages} from 'omni-sdk';
const sdk = new OmniSDKClient("omni-extension-wa-chat-ui").init({subscriptions: [OmniSDKHostMessages.CHAT_MESSAGE_RECEIVED]});
interface MyWindow extends Window {
  omniSDK: any;
}
declare var window: MyWindow;

globalThis.omniSDK = sdk;




const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppThemeProvider>
    <GlobalStyle />
    <Suspense fallback={<MainPageLoader />}>
      <App />
    </Suspense>
  </AppThemeProvider>
);
