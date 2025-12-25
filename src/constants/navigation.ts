// src/constants/navigation.ts
import {BiCart, BiHeart, BiUser, BiBell } from "react-icons/bi";
import { type IconType } from "react-icons";

export interface Route {
  title: string;
  href: string;
  Icon: IconType;
}

export const routes: Route[] = [
  {
    title: "Cart",
    href: "/cart",
    Icon: BiCart,
  },
  {
    title: "Wishlist",
    href: "/wishlist",
    Icon: BiHeart,
  },
  {
    title: "Notifications",
    href: "#",
    Icon: BiBell,
  },
  {
    title: "Login",
    href: "/login",
    Icon: BiUser,
  },
];