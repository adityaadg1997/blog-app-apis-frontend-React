import React, { useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { isLoggedIn, getCurrentUser, doLogout } from "../auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { useContext } from "react";
import userContext from "../context/userContext";

function CustomNavbar(args) {

  const userContextData=useContext(userContext)


  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);

  const logout = () => {
    //logged out
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        user:null,
        login:false
      })
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="px-5" {...args}>
        <NavbarBrand tag={ReactLink} to="/">
          My Blogs
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feeds
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>LinkedIn</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {login && (
              <>
              <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                    Profile Info
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">{user.email}</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={logout} tag={ReactLink} to="/">
                    logout
                  </NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
