import Header from "@/components/layout-components/Header/Header";
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { ToastContainer } from "@/components/ui/Toast/ToastContainer";
import clsx from "clsx";
import { SideMenu } from "@/components/layout-components/SideMenu/SideMenu";
import ModalSettings from "./components/ModalSettings/ModalSettings";

export const MainLayout = () => {
  const mainClass = clsx(styles['cl-layout__main'], "l-container l-content-section")
  return (
    <div className="l-main-layout">
      <Header />
      <SideMenu />
      <ModalSettings />
      <main className={mainClass}>
        <ToastContainer />
        <Outlet />
      </main>
    </div>
  );
};
