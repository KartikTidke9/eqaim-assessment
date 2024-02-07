import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Suggestions from "./pages/Suggestions";
import NewFeedback from "./pages/NewFeedback";
import EditFeedback from "./pages/EditFeedback";

const router = createBrowserRouter([
  { path: "/", index: true, element: <App /> },
  { path: "/suggestions", element: <Suggestions /> },
  { path: "/feedback/new", element: <NewFeedback /> },
  { path: "/feedback/edit", element: <EditFeedback /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
