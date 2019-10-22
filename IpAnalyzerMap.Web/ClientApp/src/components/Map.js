import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";

export class Map extends Component {
    render() {
        const locationsCount = this.props.locations.length;
        const avrLat =
            this.props.locations
                .map(l => l.location.latitude)
                .reduce((a, b) => a + b, 0) / locationsCount;
        const avrLong =
            this.props.locations
                .map(l => l.location.longitude)
                .reduce((a, b) => a + b, 0) / locationsCount;

        return (
            <LeafletMap
                center={[avrLat, avrLong]}
                zoom={2}
                maxZoom={12}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >
                <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                {this.props.locations.map(location => (
                    <Marker
                        key={location.providerName}
                        position={[location.location.latitude, location.location.longitude]}
                    />
                ))}
            </LeafletMap>
        );
    }
}
