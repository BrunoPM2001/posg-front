import { createRoot } from "react-dom/client";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <I18nProvider locale="es" messages={[messages]}>
    <App />
  </I18nProvider>
);
