import React, { Component } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import { Map } from "./Map";

export class TableMap extends Component {
    constructor(props) {
        super(props);

        props.locations.forEach(location => (location.isActive = true));
        
        this.state = {
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
        console.log(this.state.locations);
        
        return (
            <Container>
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
}
