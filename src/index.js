import { render } from "react-dom";
import Dashboard from './components/dashboard/Dashboard';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
   <Provider store={store}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
    </Provider>
  </BrowserRouter>,
  rootElement
);
