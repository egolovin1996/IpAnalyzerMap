import React, { Component } from "react";
import { Table } from "reactstrap";

export class SimpleTable extends Component {
    render() {
        return(
            <Table borderless>
                <thead>
                <tr>
                    <th>Провайдер</th>
                    <th>Страна</th>
                    <th>Город</th>
                    <th>Широта</th>
                    <th>Долгта</th>
                </tr>
                </thead>
                <tbody>
                {this.props.locations.map(location => (
                    <tr key={location.provider}>
                        <td>{location.provider}</td>
                        <td>{location.country || "Не определено"}</td>
                        <td>{location.city || "Не определено"}</td>
                        <td>{location.latitude.toFixed(2)}</td>
                        <td>{location.longitude.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}