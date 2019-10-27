import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import {Result} from "./Result";

export class MultiSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            request: "",
            addresses: [],
            isWorking: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ request: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.isWorking) return;

        this.setState({
            addresses: this.state.request.split(","),
            isWorking: true
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleText">
                            Множественный поиск. Разделитель запятая.
                        </Label>
                        <Input
                            type="textarea"
                            rows="5"
                            value={this.state.request}
                            onChange={this.handleChange}
                            placeholder="8.8.8.8, 8.8.8.8, 8.8.8.8"
                        />
                    </FormGroup>
                    {this.state.isWorking ? (
                        <div>
                            {this.state.addresses.map(address => {
                                return (
                                    <Result
                                        ip={address}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <Button>Обработать</Button>
                    )}
                </Form>
            </div>
        );
    }
}
