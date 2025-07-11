import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { LandingPage } from "./pages/LandingPage";
import HomePageM from "./pages/HomePageM";
import UploadScreen from "./pages/UploadScreen";
import SessionPage from "./pages/Session";
import SessionDetail from "./pages/SessionDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import LyricsModal from "./components/LyricsModal";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
              <LandingPage />
          }
        />
        <Route
          path="/signin"
          element={
              <Signin />
          }
        />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/signup"
          element={
              <Signup />
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePageM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session"
          element={
            <ProtectedRoute>
              <SessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session/:sessionId"
          element={
            <ProtectedRoute>
              <SessionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lyrics"
          element={
            <ProtectedRoute>
              <LyricsModal
                isOpen={true}
                onClose={() => {}}
                title=""
                artist=""
                lyrics=""
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
