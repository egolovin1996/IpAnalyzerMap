import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import {Result} from "./Result";

export class MultiSearch extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            request: "",
            addresses: [],
            isWorking: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ request: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.isWorking) return;
        
        const addresses = this.getAddresses(this.state.request);
        
        this.setState({
            addresses: addresses,
            isWorking: true
        });
        
        event.preventDefault();
    }
    
    getAddresses(request){
        const inputResults = request.split(",");
        const result = [];

        inputResults.forEach(item => {
            if(!item.includes('-')){
                result.push(item);
                return;
            }

            const rangeParts = item.split('-');
            const startIp = MultiSearch.ipToNumber(rangeParts[0]);
            const endIp = MultiSearch.ipToNumber(rangeParts[1]);
            if(startIp > endIp) return;

            for (let i = startIp; i < endIp + 1; i++){
                result.push(MultiSearch.NumberToIp(i));
            }

        });
        
        return result;
    }

    render() {
        if(this.props.range){
            const request = this.props.range;
            const addresses = this.getAddresses(request)

            this.state = {
                request,
                addresses,
                isWorking: true,
            };
        }
        
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {this.props.range 
                        ? ("") 
                        : (
                            <FormGroup>
                                <h4>Множественный поиск</h4>
                                <Label for="exampleText">
                                    Разделитель запятая
                                </Label>
                                <Input
                                    type="textarea"
                                    rows="5"
                                    value={this.state.request}
                                    onChange={this.handleChange}
                                    placeholder="8.8.8.8, 8.8.8.5-8.8.8.6, 8.8.8.8"
                                />
                            </FormGroup>
                        )
                    }
                    {this.state.isWorking ? (
                        <div>
                            {this.state.addresses.map(address => {
                                return (
                                    <Result
                                        key={address}
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
