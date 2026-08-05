import Header from "@components/organisms/Header/Header";
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { ToastContainer } from "@/components/organisms/Toast/ToastContainer";
import clsx from "clsx";
import { SideMenu } from "@/components/organisms/SideMenu/SideMenu";
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
