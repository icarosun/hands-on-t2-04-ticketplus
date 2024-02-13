import { Outlet } from "react-router-dom";
import AppBarComprador from "../../../components/AppBar/AppBarComprador/AppBarComprador.tsx";

export default function CompradorNavBarLayout() {
  return (
    <div>
      <AppBarComprador></AppBarComprador>
      <Outlet />
    </div>
  );
}