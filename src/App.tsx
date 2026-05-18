import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/utility/ProtectedRoute';
import Login from './views/Login';
import WorkoutView from './views/WorkoutView';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <h1>
              Welcome to Workout Tracker! Please select a workout to get
              started.
            </h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workout/:id"
        element={
          <ProtectedRoute>
            <WorkoutView />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
