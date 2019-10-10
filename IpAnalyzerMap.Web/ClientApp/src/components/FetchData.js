import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
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
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Location</h1>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
      const response = await fetch('api/location/getAllLocations/8.8.8.8');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
