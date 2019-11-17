import React, { Component } from "react";
import { Table } from "reactstrap";

export class ScanResult extends Component {
    render() {
        console.log(this.props.scans);
        return(
            <Table>
                <thead>
                <tr>
                    <th>Источник</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(this.props.scans).map(key => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{this.props.scans[key].result}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}