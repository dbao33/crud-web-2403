import LayoutRoot from "components/common/LayoutRoot";
import Login from "pages/LoginPage/Login";
import UserCreate from "pages/UserCreatePage/UserCreate";
import UserDetail from "pages/UserDetailPage/UserDetail";
import UserList from "pages/UserListPage/UserList";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "user/:id",
        element: <UserDetail />,
      },
      {
        path: "user/create",
        element: <UserCreate />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
