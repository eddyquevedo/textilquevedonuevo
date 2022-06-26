import {Navbar, Container, Nav,NavDropdown} from "react-bootstrap"
import {NavLink} from 'react-router-dom'
import CartWidget from "../CartWidget/CartWidget"
function NavBarExample ({param1}) {
    return (
        <div>
            <Navbar className="navBg" collapseOnSelect expand="lg" variant="dark">
                <Container>
                <Navbar.Brand as={NavLink} to='/'> "MAQUINARIAS DON QUEVEDO" </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/'
                            className={({ isActive })=> isActive ? 'clase1' : 'clase2'
                        }> INICIO  </NavLink>
                        <NavLink to="/about"> QUIENES SOMOS </NavLink>
                        <NavDropdown title=" TIPOS " id="collasible-nav-dropdown">
                        <NavLink to="/categoria/maquina1" >MAQUINAS FAMILIARES</NavLink>
                        <NavDropdown.Divider />
                        <NavLink to="/categoria/maquina2">MAQUINAS SEMI-INDUSTRIALES</NavLink>
                        <NavDropdown.Divider />
                        <NavLink to="/categoria/maquina3">MAQUINAS INDUSTRIALES</NavLink>
                        <NavDropdown.Divider />
                        </NavDropdown>
                        <NavLink to=""> COMO LLEGAR </NavLink>
                        <NavLink to="/contact"> CONTACTO </NavLink>
                    </Nav>
                    <Nav>
                    <div>
                    <CartWidget />
                    </div>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h2>{param1}</h2>
        </div>
    )
}
export default NavBarExample
