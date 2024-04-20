import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/login";
import Main from "./components/main";
import { NextUIProvider } from "@nextui-org/react";
import Reservation from "./components/reservation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <NextUIProvider>
        <div className="font-poppins">
          <Router basename="/maturita">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/rezervace" element={<Reservation />} />
            </Routes>
          </Router>
        </div>
        <ToastContainer />
      </NextUIProvider>
  );
}

export default App;
