import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";
import { Button } from "../styles/Button";
import { useUserContext } from "../context/user_context";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const { total_item } = useCartContext();
  const { user, setUser } = useUserContext();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("localCartData");
  };

  const navLinkClass =
    "inline-block no-underline text-[1.8rem] font-semibold uppercase text-[#1d1d1d] transition-all duration-300 hover:text-[#8490ff] active:text-[#8490ff] relative group";
  const activeLinkClass = "text-[#8490ff]";

  return (
    <nav>
      <div className={menuIcon ? "active" : ""}>
        <ul
          className={`
            flex gap-12 items-center list-none
            max-md:fixed max-md:top-0 max-md:left-0 max-md:w-screen max-md:h-screen max-md:bg-white max-md:flex-col max-md:justify-center max-md:items-center max-md:transition-transform max-md:duration-300 max-md:z-[999]
            ${menuIcon ? "max-md:translate-x-0" : "max-md:translate-x-full max-md:opacity-0 max-md:invisible"}
            ${menuIcon ? "max-md:opacity-100 max-md:visible" : ""}
        `}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : ""}`
              }
              onClick={() => setMenuIcon(false)}
            >
              Home
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#8490ff] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : ""}`
              }
              onClick={() => setMenuIcon(false)}
            >
              About
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#8490ff] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : ""}`
              }
              onClick={() => setMenuIcon(false)}
            >
              Products
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#8490ff] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : ""}`
              }
              onClick={() => setMenuIcon(false)}
            >
              Contact
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#8490ff] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeLinkClass : ""}`
              }
              onClick={() => setMenuIcon(false)}
            >
              Admin
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#8490ff] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/signup" onClick={() => setMenuIcon(false)}>
              <Button>SignUp</Button>
            </NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLinkClass : ""}`
                  }
                  onClick={() => setMenuIcon(false)}
                >
                  Orders
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#8490ff] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={() => setMenuIcon(false)}>
                  <Button
                    style={{ backgroundColor: "red" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" onClick={() => setMenuIcon(false)}>
                <Button>Login</Button>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/cart"
              className="relative group text-[#1d1d1d]"
              onClick={() => setMenuIcon(false)}
            >
              <FiShoppingCart className="text-[3.2rem]" />
              <span className="absolute w-[2.4rem] h-[2.4rem] bg-[#8490ff] text-white rounded-full grid place-items-center -top-[20%] left-[70%] text-[1.4rem]">
                {total_item}
              </span>
            </NavLink>
          </li>
        </ul>

        {/* Mobile Navbar Button */}
        <div className="hidden max-md:block z-[9999] cursor-pointer">
          <CgMenu
            name="menu-outline"
            className={`text-[4.2rem] text-[#1d1d1d] ${menuIcon ? "hidden" : "block"}`}
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className={`text-[4.2rem] text-[#1d1d1d] fixed top-[30px] right-[30px] z-[9999] ${menuIcon ? "block" : "hidden"}`}
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
