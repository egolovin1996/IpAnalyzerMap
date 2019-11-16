import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Form,
  Button,
  Input,
  FormGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import history from "../history";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      ipAddress: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ipAddress: event.target.value });
  }

  handleSubmit(event) {
    history.push("/map/" + this.state.ipAddress);
    event.preventDefault();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
        <header>
          <Navbar
              className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
              light
          >
            <Container>
              <NavbarBrand tag={Link} to="/">
                Ip Анализатор
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse
                  className="d-sm-inline-flex flex-sm-row-reverse"
                  isOpen={!this.state.collapsed}
                  navbar
              >
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">
                      Анализ трафика
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/multi">
                      Множественный поиск
                    </NavLink>
                  </NavItem>
                  <Form inline onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Input
                          type="text"
                          value={this.state.ipAddress}
                          onChange={this.handleChange}
                          placeholder="8.8.8.8"
                      />
                    </FormGroup>
                    <Button type="submit">Поиск</Button>
                  </Form>
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
    );
  }
}
