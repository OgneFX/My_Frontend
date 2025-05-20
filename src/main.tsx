import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { postEvent } from "@telegram-apps/sdk";
import "./slyles/global.scss";
import { App } from "./App";

// postEvent("web_app_expand");
// postEvent("web_app_setup_main_button", { is_visible: false });
// postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
// postEvent("web_app_ready");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
