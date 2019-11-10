import React, { Component } from "react";
import {
    Badge,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Table
} from "reactstrap";
import { Map } from "./Map";

export class TableMap extends Component {
    constructor(props) {
        super(props);

        const probable = this.getProbable(props.locations);
        props.locations.forEach(location => (location.isActive = true));
        
        this.state = {
            probable,
            locations: [...props.locations]
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(location) {
        const oldLocations = [...this.state.locations];
        
        if (!location.isActive) {
            this.setState({ locations: [...oldLocations, location] });
        } else {
            if(oldLocations.length < 2) return;
            
            this.setState({
                locations: oldLocations.filter(
                    item => item.provider !== location.provider
                )
            });
        }

        location.isActive = !location.isActive;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>
                                <h3>{this.props.ip} <Badge color="success">{this.state.probable}</Badge></h3>
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                                <Table borderless>
                                    <tbody>
                                        <tr>
                                            <td style={{width: "270px"}}>Дата последнего обновления:</td>
                                            <td>{this.props.scan.lastUpdateDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Организация:</td>
                                            <td>{this.props.scan.organization}</td>
                                        </tr>
                                        <tr>
                                            <td>Интернет-провайдер:</td>
                                            <td>{this.props.scan.isp}</td>
                                        </tr>
                                        <tr>
                                            <td>Доступные порты:</td>
                                            <td>{this.props.scan.ports.length 
                                                ? this.props.scan.ports
                                                    .map(item => (<Badge className="mr-2" color="danger">{item}</Badge>)) 
                                                : "Нет доступных портов"}</td>
                                        </tr>
                                        <tr>
                                            <td>Возможные уязвимости:</td>
                                            <td>{this.props.scan.vulnerabilities && this.props.scan.vulnerabilities.length ? this.props.scan.vulnerabilities.join(", ") : "Не обнаружены"}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col xs="5">
                        <Table hover>
                            <thead>
                            <tr>
                                <th>{""}</th>
                                <th>Источник</th>
                                <th>Метоположение</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.locations.map(location => (
                                <tr
                                    style={{ cursor: "pointer" }}
                                    key={location.provider}
                                    onClick={() => this.handleClick(location)}
                                >
                                    <th scope="row">{location.isActive?"+":""}</th>
                                    <td>{location.provider}</td>
                                    <td>{`${location.country}(${location.city || "Не определен"})`}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Map
                            locations={this.state.locations}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    getProbable(data){
        const dict = {};
        data.forEach(item => {
            if(!item.city) return;
            
            if(dict[item.city]){
                dict[item.city]++;
            }else{
                dict[item.city] = 1;
            }
        });

        let max = 0;
        let result = "";
        for (let key in dict){
            if(dict[key] > max){
                max = dict[key];
                result = key;
            }
        }

        return result;
    }
}
