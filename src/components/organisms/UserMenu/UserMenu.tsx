import clsx from "clsx";
import { useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { ChevronDown } from "lucide-react";
import style from "./UserMenu.module.scss";
import MenuManager from "@/components/molecules/MenuManager/MenuManager";
import { AVAILABLE_MENUS } from "@/constants/configuration";
import { useLogout } from "@/hooks/api/useAuthenticationHooks";
import type { MenuItemConfiguration } from "@/components/molecules/MenuManager/MenuManager.types";
import type { MenuItem } from "@/constants/routes";
import { useTranslation } from "react-i18next";
import { DropDownHead } from "@/components/molecules/Dropdown/Dropdown";

const SubMenu = ({ item, onClose }: { item: MenuItem, onClose: () => void }) => {
  const {t} = useTranslation("menu");

  return (
    <>
      <div>
        <item.handle.Icon size={16} /> {t(item.handle.label)}
      </div>
      <MenuManager
        curMenu="user.details"
        additionalClass={style["c-user-menu__sublist"]}
        itemClickHandler={onClose}
        template={item => (
          <a key={item.handle.key} title={t(item.handle.label)}>
            <item.handle.Icon />
          </a>
        )}
      />
    </>
  );
};

const UserMenu = () => {
  const {user} = useAuth();
  const {mutate: logout} = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const userMenuOpen = clsx({[style['c-user-menu__chevron-opened']]: isOpen});

  const menuConfig: MenuItemConfiguration = {
    LOGOUT: {clickHdlr:() => logout(''), kind: 'action'},
    USER: {template: (item) => <SubMenu item={item} onClose={() => setIsOpen(false)} />, kind: 'toggle'}
  }
  return (
    <DropDownHead
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      label={
        <div className={style["c-user-menu__user-info"]}>
          <span className={style["c-user-menu__username"]}>
            {user}
          </span>
          <ChevronDown className={userMenuOpen} size={12}/>
        </div>
      }>
        <MenuManager
          curMenu={AVAILABLE_MENUS.USER}
          additionalClass={style["c-user-menu__list"]}
          itemClickHandler={() => setIsOpen(false)}
          config={menuConfig}
        />
      </DropDownHead>
  )
}

export default UserMenu;
