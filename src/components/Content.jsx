import React, { Component } from "react";
import "../style/Content.css";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import classnames from "classnames";
import config from "../config/datasource";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup
} from "reactstrap";

class Content extends Component {
  state = {
    endpoint: "",
    body: {},
    bodyOption: "Planets",
    dropdownOpen: false,
    chooseMethod: "GET",
    isLoading: true,
    activeTab: "0",
    response: JSON
  };

  componentWillMount = () => {
    this.apiRequest();
  };

  apiRequest = () => {
    this.setState({
      isLoading: true
    });

    const url = config.heroku.url + this.state.endpoint;
    console.log(url);

    if (this.state.chooseMethod === "GET") {
      axios.get(url).then(response => {
        this.setState({
          response: response.data,
          isLoading: false
        });
      });
    }
    if (this.state.chooseMethod === "POST") {
      const body = this.state.body;

      axios.post(url, body).then(response => {
        this.setState({
          response: response.data,
          isLoading: false
        });
      });
    }
    if (this.state.chooseMethod === "PUT") {
      const body = JSON.parse(this.state.body);

      axios.put(url, body).then(response => {
        this.setState({
          response: response.data,
          isLoading: false
        });
      });
    }
    if (this.state.chooseMethod === "DELETE") {
      axios.delete(url).then(response => {
        this.setState({
          response: response.data,
          isLoading: false
        });
      });
    }
  };

  toggleDropDown = () => {
    const newDropDownOpen = !this.state.dropdownOpen;
    this.setState({
      dropdownOpen: newDropDownOpen
    });
  };

  changeMethod = event => {
    this.setState({
      chooseMethod: event.target.innerHTML
    });
  };

  handleInputChange = event => {
    this.setState({
      endpoint: event.target.value
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleBodyOptionChange = event => {
    this.setState({
      bodyOption: event.target.value
    });
  };

  handleBodyChange = event => {
    const key = event.target.placeholder;

    if (event.target.value) {
      let body = { ...this.state.body };
      body[key] = event.target.value;
      this.setState({
        body
      });
    } else {
      delete this.state.body[key];
    }
  };

  renderForm = () => {
    if (this.state.bodyOption === "Planets") {
      return (
        <Form>
          <FormGroup>
            <Input
              placeholder="name"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="climate"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="terrain"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="population"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
        </Form>
      );
    }
    if (this.state.bodyOption === "People") {
      return (
        <Form>
          <FormGroup>
            <Input
              placeholder="name"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="height"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="hair_color"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="skin_color"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="eye_color"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="birth_year"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="gender"
              onChange={event => this.handleBodyChange(event)}
            />
          </FormGroup>
        </Form>
      );
    }
  };

  handleSubmit = () => {
    this.apiRequest();
    this.toggle("0");
  };

  render() {
    return (
      <div className="content">
        <InputGroup>
          <InputGroupAddon addonType="prepend">api/</InputGroupAddon>
          <Input
            placeholder="insert the endpoint"
            onChange={this.handleInputChange}
          />
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropDown}
          >
            <DropdownToggle caret>{this.state.chooseMethod}</DropdownToggle>
            <DropdownMenu onClick={this.changeMethod}>
              <DropdownItem>GET</DropdownItem>
              <DropdownItem>POST</DropdownItem>
              <DropdownItem>PUT</DropdownItem>
              <DropdownItem>DELETE</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
        <Button
          type="submit"
          className="submit-button"
          outline
          color="warning"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "0" })}
              onClick={() => {
                this.toggle("0");
              }}
            >
              Response
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Body
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="0">
            <div className="hero-section">
              <JSONPretty id="json-pretty" json={this.state.response} />
            </div>
          </TabPane>
          <TabPane tabId="1">
            <div className="hero-section">
              <div className="form">
                <Input type="select" onChange={this.handleBodyOptionChange}>
                  <option>Planets</option>
                  <option>People</option>
                </Input>
                {this.renderForm()}
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Content;
