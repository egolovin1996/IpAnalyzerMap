import React, { Component } from 'react';
import { Map } from "./Map";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true,  };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.ip !== this.props.match.params.ip){
      this.setState({ loading: true });
    }
  }

  componentDidMount() {
    return this.getLocation();
  }

  componentDidUpdate(nextProps, nextState){
    if(nextProps.match.params.ip !== this.props.match.params.ip){
      this.getLocation();
    }
  }

  static renderForecastsTable(forecasts) {
    return (
        <div>
          <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
            <tr>
              <th>Api provider</th>
              <th>Location Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
            </thead>
            <tbody>
            {forecasts.map(forecast =>
                <tr key={forecast.providerName}>
                  <td>{forecast.providerName}</td>
                  <td>{forecast.location.name}</td>
                  <td>{forecast.location.latitude}</td>
                  <td>{forecast.location.longitude}</td>
                </tr>
            )}
            </tbody>
          </table>
          <Map 
              latitude={forecasts[0].location.latitude}
              longitude={forecasts[0].location.longitude}
          />
        </div>
    );
  }

  render() {
    console.log('render');
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async getLocation() {
    console.log("load:" + this.props.match.params.ip);
    const ipAddress = this.props.match.params.ip || '8.8.8.8';
    const response = await fetch('api/location/getAllLocations/'+ ipAddress);
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
