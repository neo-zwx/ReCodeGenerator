import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PatternPage from "./pages/PatternPage.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App/>
//   </StrictMode>,
// )

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root'),
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //為整個應用啟用嚴格模式
  <StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
