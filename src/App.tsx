import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/utility/ProtectedRoute';
import Login from './views/Login';
import WorkoutView from './views/WorkoutView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Homescreen from './views/Homescreen';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homescreen />
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
    </QueryClientProvider>
  );
}

export default App;
