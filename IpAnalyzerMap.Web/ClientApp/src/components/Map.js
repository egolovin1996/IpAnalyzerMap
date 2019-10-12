import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';

export class Map extends Component {
    render() {
        return(
            <LeafletMap
                center={[this.props.latitude, this.props.longitude]}
                zoom={2}
                maxZoom={10}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                <Marker position={[this.props.latitude, this.props.longitude]}/>
            </LeafletMap>
        );
    }
}