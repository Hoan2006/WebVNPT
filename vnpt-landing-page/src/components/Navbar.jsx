import { NavLink } from "react-router-dom";
import { useState } from "react";

import "../styles/navBar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <nav className="navbar">

      <div className="container navbar-container">

        {/* Desktop Menu */}

        <ul className="desktop-menu">

          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Trang chủ
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/internet"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Dịch vụ Internet
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/e-contract"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Hợp đồng điện tử
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/chu-ky-so"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Chữ ký số
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/ho-kinh-doanh"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Hộ kinh doanh
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tin-tuc"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Tin tức
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/lien-he"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Liên hệ
            </NavLink>
          </li>

        </ul>

        {/* Hamburger */}

        <button
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(true)
          }
        >
          ☰
        </button>

      </div>

      {/* Overlay */}

      <div
        className={`menu-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={closeMenu}
      />

      {/* Sidebar */}

      <div
        className={`mobile-sidebar ${
          menuOpen ? "open" : ""
        }`}
      >

        <button
          className="close-btn"
          onClick={closeMenu}
        >
          ✕
        </button>

        <NavLink
          to="/"
          end
          onClick={closeMenu}
        >
          Trang chủ
        </NavLink>

        <NavLink
          to="/internet"
          onClick={closeMenu}
        >
          Dịch vụ Internet
        </NavLink>

        <NavLink
          to="/e-contract"
          onClick={closeMenu}
        >
          Hợp đồng điện tử
        </NavLink>

        <NavLink
          to="/chu-ky-so"
          onClick={closeMenu}
        >
          Chữ ký số
        </NavLink>

        <NavLink
          to="/ho-kinh-doanh"
          onClick={closeMenu}
        >
          Hộ kinh doanh
        </NavLink>

        <NavLink
          to="/tin-tuc"
          onClick={closeMenu}
        >
          Tin tức
        </NavLink>

        <NavLink
          to="/lien-he"
          onClick={closeMenu}
        >
          Liên hệ
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;