import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import Role from "../../../model/Role";
import UserModel from "../../../model/userModel";
import { store } from "../../../Redux/Store";
import AuthMenu from "../../UserArea/AuthMenu/AuthMenu";
import logoPng from "../../images/logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";

function Header(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

  const navigate = useNavigate();
  useEffect(() => {
    const user = store.getState().user;
    setUser(user);

    const unsubscribe = store.subscribe(() => {
      const user = store.getState().user;
      setUser(user);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Navbar expand="lg" >
        <Container fluid>
          <Navbar.Brand> <img src={logoPng} alt="" /> </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
              {user?.is_admin === Role.Admin && <Nav.Link onClick={() => navigate("/addvacation")}>Add vacation</Nav.Link>}
            </Nav>
            <AuthMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
       
      

    </>
  );
}

export default Header;