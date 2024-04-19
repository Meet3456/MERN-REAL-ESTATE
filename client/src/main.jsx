import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.js";

// Provide the Redux Store to React
ReactDOM.createRoot(document.getElementById("root")).render(
  //  Importing the Redux store we just created, put a <Provider> around your <App>, and pass the store as a prop:
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);
