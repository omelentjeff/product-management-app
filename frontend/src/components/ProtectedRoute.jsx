export default function ProtectedRoute({ element }) {
  const isAuthenticated = false; // todo: check if user is authenticated

  return isAuthenticated ? element : <Navigate to="/login" />;
}
