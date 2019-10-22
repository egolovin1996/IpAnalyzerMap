import React, { Component } from "react";
import { TableMap } from "./TableMap"

export class Search extends Component {
    static displayName = Search.name;

    constructor(props) {
        super(props);
        this.state = { locations: [], loading: true };
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

    static renderLocationsTable(locations) {
        return (
            <TableMap 
                locations = {locations}
            />
        );
    }

    render() {
        console.log("render");
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            Search.renderLocationsTable(this.state.locations)
        );

        return <div>{contents}</div>;
    }

    async getLocation() {
        console.log("load:" + this.props.match.params.ip);
        const ipAddress = this.props.match.params.ip || "8.8.8.8";
        const response = await fetch("api/location/getAllLocations/" + ipAddress);
        const data = await response.json();
        this.setState({ locations: data, loading: false });
    }
}
