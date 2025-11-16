import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

import AuthProvider from "./context/AuthProvider";

// AOS import
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

AOS.init({
  duration: 800, // animation speed
  offset: 80, // trigger distance
  once: true, // animate only once
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>
);
