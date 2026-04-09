import { Link, NavLink } from "react-router-dom";
import type { LinkCompnentProps } from "./LinkComponent.types";

const LinkComponent = ({type='navLink', to, className, children, ...rest}: LinkCompnentProps) => {
  if(type === 'link') {
    return <Link to={to} {...rest}>{children}</Link>
  }
  return <NavLink to={to} className={className} {...rest}>{children}</NavLink>
}
export default LinkComponent;