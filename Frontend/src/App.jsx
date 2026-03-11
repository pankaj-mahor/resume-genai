import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRoutes} />
    </AuthProvider>
  );
}

export default App;
