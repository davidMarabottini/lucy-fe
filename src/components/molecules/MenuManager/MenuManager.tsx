import { useMenu } from "@/hooks/useMenu";
import type { MenuManagerProps } from "./MenuManager.types";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const MenuManager = ({
  curMenu,
  itemClickHandler,
  additionalClass,
  template,
  config
}: MenuManagerProps) => {
  const menu = useMenu(curMenu);
  const navigate = useNavigate();
  const { t } = useTranslation("menu");

  return (
    <ul className={clsx(additionalClass)}>
      {menu!.map((item) => {
        const curConfig = config?.[item.handle.key];
        const kind = curConfig?.kind ?? 'link';
        const currClickHdlr = () => {
          curConfig?.clickHdlr?.();
          if (kind === 'toggle') return;
          if (item.path) navigate(item.path);
          itemClickHandler?.(item.handle.key);
        }

        const defaultTemplate = (
          <LinkComponent
            to={item.path}
          >
            <item.handle.Icon size={16} /> {t(item.handle.label)}
          </LinkComponent>
        );

        return (
          <li key={item.handle.key} onClick={currClickHdlr}>
            {curConfig?.template?.(item) || template?.(item) || defaultTemplate}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuManager;
