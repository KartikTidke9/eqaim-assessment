import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Suggestions from "./pages/Suggestions";
import NewFeedback from "./pages/NewFeedback";
import EditFeedback from "./pages/EditFeedback";
import { Provider } from "react-redux";
import { store } from "./store";
import FeedbackDetail from "./pages/FeedbackDetail";

const router = createBrowserRouter([
  { path: "/", index: true, element: <App /> },
  { path: "/suggestions", element: <Suggestions /> },
  { path: "/feedback/new", element: <NewFeedback /> },
  { path: "/feedback/:id", element: <FeedbackDetail /> },
  { path: "/feedback/edit", element: <EditFeedback /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
