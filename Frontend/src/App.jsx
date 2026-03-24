import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={appRoutes} />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
