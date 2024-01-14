import { Outlet } from "react-router-dom";
import CustomNavBar from "../../../components/Navbar/Main/index.tsx";

export default function NavBarLayout() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CustomNavBar />
      <Outlet />
    </div>
  );
}