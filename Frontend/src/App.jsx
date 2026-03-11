import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/app.routes.jsx";

function App() {
  return <RouterProvider router={appRoutes} />;
}

export default App;
