import { Link, Outlet } from "react-router-dom";
import { Footer } from "../layoutComponents/Footer";
import { Header } from "../layoutComponents/Header";

export function HomeLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </>
  );
}
