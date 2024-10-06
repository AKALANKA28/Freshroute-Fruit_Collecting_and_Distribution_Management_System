import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <p>HEllo</p>

    </div>
  );
}

export default App;