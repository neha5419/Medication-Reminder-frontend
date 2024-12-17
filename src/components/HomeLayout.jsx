import Header from "./Header";

import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
