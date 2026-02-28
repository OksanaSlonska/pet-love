import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

interface Props {
  onClose?: () => void; // Чтобы закрывать меню при клике
}

export default function Navigation({ onClose }: Props) {
  return (
    <nav className={s.nav}>
      <NavLink to="/news" className={s.link} onClick={onClose}>
        News
      </NavLink>
      <NavLink to="/find-pet" className={s.link} onClick={onClose}>
        Find pet
      </NavLink>
      <NavLink to="/our-friends" className={s.link} onClick={onClose}>
        Our friends
      </NavLink>
    </nav>
  );
}
