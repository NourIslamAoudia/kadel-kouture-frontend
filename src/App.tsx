import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AppProviders } from "./app/providers";
import { AuthProvider } from "@features/auth/context/AuthContext";

function App() {
  return (
    <AppProviders>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProviders>
  );
}

export default App;
