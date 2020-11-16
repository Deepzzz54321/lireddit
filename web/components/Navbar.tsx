import React from "react";
import NextLink from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

const NavbarComponent: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let NavLinks;
  if (fetching) {
    NavLinks = null;
  } else if (data?.me) {
    NavLinks = (
      <Nav className="ml-auto">
        <Nav.Link href="#">{data.me.username}</Nav.Link>
        <button
          onClick={() => {
            logout();
          }}
          disabled={logoutFetching}
          className="nav-link btn btn-outline-secondary mt-2 mt-md-0 ml-md-3"
        >
          Log Out
        </button>
      </Nav>
    );
  } else {
    NavLinks = (
      <Nav className="ml-auto">
        <NextLink href="/register">
          <a className="nav-link btn btn-secondary text-white">Register</a>
        </NextLink>
        <NextLink href="/login">
          <a className="nav-link btn btn-outline-secondary text-white mt-2 mt-md-0 ml-md-3">
            Login
          </a>
        </NextLink>
      </Nav>
    );
  }

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">{NavLinks}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
