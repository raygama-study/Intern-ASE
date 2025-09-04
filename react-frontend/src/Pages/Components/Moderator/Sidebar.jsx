import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  ClipboardList,
  ShieldAlert,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import LogoIcon from "/src/assets/images/material-symbols_voice-over-off-rounded.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const sidebarBaseItem =
    "flex items-center gap-3 rounded-[10px] px-4 py-3 font-abhaya transition";
  const activeItem =
    "bg-[#C65C33] text-white shadow-[0_6px_16px_rgba(198,92,51,0.25)]";
  const idleItem =
    "text-darkText hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65C33]/40";

  const linkClass = ({ isActive }) =>
    `${sidebarBaseItem} ${isActive ? activeItem : idleItem}`;

  const handleLogout = () => {
    // hapus data auth
    localStorage.removeItem("vu:token");
    localStorage.removeItem("vu:user");
    localStorage.removeItem("vu:username");

    // redirect ke halaman login
    navigate("/");
  };

  return (
    <aside className="w-[260px] shrink-0 min-h-screen bg-[#EFE4D7] border-r border-[#E6E0DA] px-5 py-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <img
          src={LogoIcon}
          alt="Logo"
          className="w-6 h-6 text-[#C65C33]"
          aria-hidden="true"
        />
        <span className="font-aboreto text-lg tracking-wide">
          VOICE UNHEARD
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink to="/moderator/dashboard" className={linkClass}>
          <Menu className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/moderator/queue" className={linkClass}>
          <ClipboardList className="w-5 h-5" />
          Moderation Queue
        </NavLink>

        <NavLink to="/moderator/emergency" className={linkClass}>
          <ShieldAlert className="w-5 h-5" />
          Emergency case
        </NavLink>

        <NavLink to="/moderator/history" className={linkClass}>
          <History className="w-5 h-5" />
          Review History
        </NavLink>

        <NavLink to="/moderator/settings" className={linkClass}>
          <Settings className="w-5 h-5" />
          Setting
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className={`${sidebarBaseItem} ${idleItem} mt-2`}
      >
        <LogOut className="w-5 h-5" />
        Log out
      </button>
    </aside>
  );
}