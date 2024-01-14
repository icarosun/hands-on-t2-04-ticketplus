import { Outlet } from "react-router-dom";
import NavbarComprador from "../../../components/Navbar/Comprador/index.tsx";

export default function CompradorNavBarLayout() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <NavbarComprador />
      <Outlet />
    </div>
  );
}