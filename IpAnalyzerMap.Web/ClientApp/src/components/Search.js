import React, { Component } from "react";
import { TableMap } from "./TableMap";
import Loader from "react-loader-spinner";

export class Search extends Component {
    static displayName = Search.name;

    constructor(props) {
        super(props);
        
        this.state = { locations: [], scan: null, loading: true };
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

    static renderLocationsTable(locations, ip, scan) {
        return (
            <TableMap 
                locations = {locations}
                ip = {ip}
                scan = {scan}
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
            Search.renderLocationsTable(this.state.locations, this.props.match.params.ip || "8.8.8.8", this.state.scan)
        );

        return <div>{contents}</div>;
    }

    async getLocation() {
        const ipAddress = this.props.match.params.ip || "8.8.8.8";
        const [locationsResponse, scanResponse ] = [
            await fetch(`api/location/getAllLocations/${ipAddress}`), 
            await fetch(`api/location/getScanResult/${ipAddress}`)
        ];
        const locations = await locationsResponse.json();
        const scan = await scanResponse.json();
        
        this.setState({ locations, scan, loading: false });
    }
}
