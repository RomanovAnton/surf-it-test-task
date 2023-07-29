import "./style.scss";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
