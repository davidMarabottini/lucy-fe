import style from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Typography from "@/components/ui/Typography/Typography";
import { MenuIcon } from "lucide-react";
import Button from "@components/ui/Button/Button";

import { useAuth } from "@/auth/useAuth";
import UserMenu from "../UserMenu/UserMenu";
import { useMenuStore } from "@/zustand/menuState";
import { Breadcrumb } from "@/components/molecules/Breadcrumb/Breadcrumb";
import { useCompanyStore } from "@/zustand/currentCompany";
import { DropDownHead, DropDownItem } from "@/components/molecules/Dropdown/Dropdown";
import { useGroupCompanies } from "@/hooks/api/GroupCompanyHooks";

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
      <MenuIcon size={36}  />
    </Button>
  )
}

const Header = () => {
  const {t} = useTranslation("common")
  const {isAuthenticated } = useAuth();
  const {companyName, setCompany} = useCompanyStore();
  const [isOpen, setIsOpen] = useState(false);

  const {data: groupCompanies, isFetched: groupCompaniesFetched } = useGroupCompanies(undefined, true)
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

          {isAuthenticated && (
            <div className={style["c-header__breadcrumb-area"]}>
              <div >
                <Breadcrumb />
              </div>
              {groupCompaniesFetched && <div>
                <DropDownHead
                  label={companyName ?? t('common:header.actions.allCompanies')}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                >
                  {groupCompanies?.map((company) => (
                    <div key={company.id}>
                      <DropDownItem onSelect={() => setCompany(company.id, company.name)}>
                          <div className={style["c-header__dropdown-item"]}>
                            {company.name}
                          </div>
                      </DropDownItem>
                    </div>
                  ))}
                  <div>
                    <DropDownItem onSelect={() => setCompany(null, null)}>
                      <div className={style["c-header__dropdown-item"]}>
                        {t('common:header.actions.allCompanies')}
                      </div>
                    </DropDownItem>
                  </div>
                </DropDownHead>
              </div>}
            </div>
          )}
          
        </div>
      </header>
    </>
  );
};

export default Header;
