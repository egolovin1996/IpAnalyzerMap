import React, { Component } from "react";
import { TableMap } from "./TableMap";
import Loader from "react-loader-spinner";

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
        let contents = this.state.loading ? (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh"
                }}
            >
                <Loader type="ThreeDots" color="black" height={80} width={80}/>
            </div>
        ) : (
            Search.renderLocationsTable(this.state.locations)
        );

        return <div>{contents}</div>;
    }

    async getLocation() {
        const ipAddress = this.props.match.params.ip || "8.8.8.8";
        const response = await fetch("api/location/getAllLocations/" + ipAddress);
        const data = await response.json();
        this.setState({ locations: data, loading: false });
    }
}
