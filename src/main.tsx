import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { postEvent } from "@telegram-apps/sdk";
import "./slyles/global.scss";
import { App } from "./App";

try {
  postEvent("web_app_expand");
} catch (err) {
  console.error("Ошибка при попытке развернуть WebApp:", err);
}
postEvent("web_app_request_fullscreen");

postEvent("web_app_setup_main_button", { is_visible: false });
postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
postEvent("web_app_ready");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
