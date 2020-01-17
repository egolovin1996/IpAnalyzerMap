import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from "reactstrap";
import { ScanResult } from "./ScanResult";

export class ScanUrl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      result: null,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ isLoading: true });
    this.getUrlResult();
    event.preventDefault();

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Label>
              Url для сканиования. Вводить без http:// или https://.
            </Label>
            <InputGroup>
              <Input
                type="text"
                value={this.state.url}
                onChange={this.handleChange}
                placeholder="google.com"
              />
              <InputGroupAddon addonType="append">
                <input
                  type="file"
                  ref={ref => (this.upload = ref)}
                  style={{ display: "none" }}
                />
                <Button color="info" onClick={e => this.upload.click()}>
                  Загрузить файл
                </Button>
                <Button type="submit" color="success">
                  Сканировать
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
        </Form>
        {this.state.result ? (
          <ScanResult scans={this.state.result.scans} />
        ) : (
          ""
        )}
      </div>
    );
  }

  async getUrlResult() {
    const serverResult = await fetch(`api/scan/getUrlReport/${this.state.url}`);
    const loadedResult = await serverResult.json();

    this.setState({ result: loadedResult, isLoading: false });
  }
}
