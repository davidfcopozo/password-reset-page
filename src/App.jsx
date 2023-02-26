import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { ResetPassword } from "./pages/ResetPassword";
import { ForgotPassword } from "./pages/ForgotPassword";
import Success from "./pages/Success";
import "./App.css";
import NotFound from "./pages/NotFound";
import SuccessProtectedRoute from "./components/SuccessProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/*" element={<NotFound />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <SuccessProtectedRoute>
                <Success />
              </SuccessProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
