import { Outlet } from "react-router-dom";
import CheckoutAppBar from "../../../components/AppBar/AppBarCheckout/CheckoutAppBar.tsx";

export default function CheckoutNavBarLayout() {
  return (
    <div>
      <CheckoutAppBar/>
      <Outlet/>
    </div>
  );
}