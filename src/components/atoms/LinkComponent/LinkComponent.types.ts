import type { NavLinkProps, LinkProps } from "react-router-dom";

export type LinkCompnentProps = ({type?:'navLink'} & NavLinkProps) | ({type: 'link'} & LinkProps)