import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

export class Map extends Component {
    render() {
        const locationsCount = this.props.locations.length;
        const avrLat =
            this.props.locations
                .map(l => l.latitude)
                .reduce((a, b) => a + b, 0) / locationsCount;
        const avrLong =
            this.props.locations
                .map(l => l.longitude)
                .reduce((a, b) => a + b, 0) / locationsCount;

        return (
            <LeafletMap
                center={[avrLat, avrLong]}
                zoom={2}
                maxZoom={14}
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
                        color={"red"}
                        key={location.provider}
                        position={[location.latitude, location.longitude]}
                    >
                        <Popup>
                            {`Источник: ${location.provider}`}
                            <br/>
                            {`Широта: ${location.latitude.toFixed(2)}`}
                            <br/>
                            {`Долгота: ${location.longitude.toFixed(2)}`}
                            <br/>
                            {`Страна: ${location.country || "Не определено"}`}
                            <br/>
                            {`Город: ${location.city || "Не определено"}`}
                        </Popup>
                    </Marker>
                ))}
            </LeafletMap>
        );
    }
}
