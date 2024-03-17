import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/login";
import Main from "./components/main";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
      <NextUIProvider>
        <div className="font-poppins">
          <Router basename="/">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Router>
        </div>
      </NextUIProvider>
  );
}

export default App;
