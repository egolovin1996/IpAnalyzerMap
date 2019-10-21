import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Map } from "./Map";

export class Search extends Component {
    static displayName = Search.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.ip !== this.props.match.params.ip) {
            this.setState({ loading: true });
        }
    }

    componentDidMount() {
        return this.getLocation();
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.match.params.ip !== this.props.match.params.ip) {
            this.getLocation();
        }
    }

    static renderForecastsTable(locations) {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="5">
                            <table
                                className="table table-striped"
                                aria-labelledby="tabelLabel"
                            >
                                <thead>
                                    <tr>
                                        <th>Api provider</th>
                                        <th>Location Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations.map(location => (
                                        <tr key={location.providerName}>
                                            <td>{location.providerName}</td>
                                            <td>{location.location.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            {" "}
                            <Map
                                latitude={locations[0].location.latitude}
                                longitude={locations[0].location.longitude}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    render() {
        console.log("render");
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                Search.renderForecastsTable(this.state.forecasts)
            );

        return <div>{contents}</div>;
    }

    async getLocation() {
        console.log("load:" + this.props.match.params.ip);
        const ipAddress = this.props.match.params.ip || "8.8.8.8";
        const response = await fetch("api/location/getAllLocations/" + ipAddress);
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
