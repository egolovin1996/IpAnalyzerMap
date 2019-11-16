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

        const inputResults = this.state.request.split(",");
        const addresses = [];
        
        inputResults.forEach(result => {
            if(!result.includes('-')){
                addresses.push(result);
                return;
            }
            
            const rangeParts = result.split('-');
            console.log(rangeParts);
            const startIp = MultiSearch.ipToNumber(rangeParts[0]);
            console.log(startIp);
            const endIp = MultiSearch.ipToNumber(rangeParts[1]);
            console.log(endIp);
            if(startIp > endIp) return;
            
            for (let i = startIp; i < endIp + 1; i++){
                console.log(MultiSearch.NumberToIp(i));
                addresses.push(MultiSearch.NumberToIp(i));
            }
            
        });
        
        this.setState({
            addresses: addresses,
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
                            placeholder="8.8.8.8, 8.8.8.5-8.8.8.6, 8.8.8.8"
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

    static ipToNumber(dot)
    {
        const d = dot.split('.');
        return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
    }

    static NumberToIp(num)
    {
        let d = num % 256;
        for (let i = 3; i > 0; i--)
        {
            num = Math.floor(num/256);
            d = num % 256 + '.' + d;
        }
        return d;
    }
}
