import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { theme } from "configs/theme-config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider theme={theme} >
      <App />

    </ConfigProvider>
  </Provider>
);

reportWebVitals();
