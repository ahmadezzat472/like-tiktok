import { RouterProvider } from "react-router";
import { router } from "./router";
import ErrorBoundary from "./components/ErrorBoundary";
import ModalProvider from "./context/ModalProvider";
import LanguageProvider from "./context/LanguageProvider";
import AnimationProvider from "./context/AnimationProvider";

const App = () => {
  return (
    <ErrorBoundary>
      <ModalProvider>
        <LanguageProvider>
          <AnimationProvider>
            <RouterProvider router={router} />
          </AnimationProvider>
        </LanguageProvider>
      </ModalProvider>
    </ErrorBoundary>
  );
};

export default App;
