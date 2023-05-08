import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ScrollToTop from "./utils/ScrollToTop";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
          <ToastContainer hideProgressBar={true} theme="dark" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
