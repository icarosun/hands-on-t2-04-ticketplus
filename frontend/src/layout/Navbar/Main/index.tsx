import { Outlet } from "react-router-dom";
import AppBarContent from "../../../components/AppBar/AppBarInicial/AppBarInicial";
export default function NavBarLayout() {
  return (
    <div>
      <AppBarContent></AppBarContent>
      <Outlet />
    </div>
  );
}