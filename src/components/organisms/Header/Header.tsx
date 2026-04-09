import style from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import { MenuIcon } from "lucide-react";
import Button from "@components/atoms/Button/Button";

import { useAuth } from "@/auth/useAuth";
import UserMenu from "../UserMenu/UserMenu";
import { useMenuStore } from "@/zustand/menuState";

const OpenMenuBtn = () => {
  const { menuOpen, openMenu } = useMenuStore();
  const {t} = useTranslation(["common", "menu"])

  return (
    <Button 
      color="custom"
      onClick={openMenu}
      aria-label={t('common:header.actions.openMenu')}
      aria-expanded={menuOpen ? "true" : "false"}
      aria-controls="side-menu"
    >
      {/* <Gem size={40} className={style["c-header__icon"]}  /> */}
      <MenuIcon size={36}  />
    </Button>
  )
}

const Header = () => {
  const {t} = useTranslation("common")
  const {isAuthenticated } = useAuth();

  return (
    <>
      <header className={style["c-header"]}>
        <div className="l-container">
          <div className={style["c-header__container"]}>
            <div className={style["c-header__left-area"]}>
              <OpenMenuBtn />
              <Typography
                variant="h1"
                additionalClasses={style["c-header__title"]}
              >
                
                {t('app.title')}
              </Typography>
            </div>
            
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
