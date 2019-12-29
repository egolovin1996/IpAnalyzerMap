import React, { Component } from "react";
import { Table } from "reactstrap";
import { ListCreateItem } from "./ListCreateItem"

export class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            newItems: [],
            isLoading: false,
        };
    }

    addListCreateItem = () => {
        const { newItems } = this.state;
        const item = <ListCreateItem key={Date.now()}
                                     remove={() => this.removeListCreateItem(item)}
                                     add={async (newItem)  => {
                                         await this.addItem(newItem);
                                         await this.getList();
                                     }}/>;
        newItems.push(item);
        this.setState({ newItems });
    };

    removeListCreateItem = (item) => {
        console.log(item);
        const { newItems } = this.state;
        const result = newItems.filter((newItem) => newItem.key !== item.key);
        this.setState({ newItems: result });
        console.log(this.state);
    };
    
    render() {
        return(
            <div>
                <div className="d-flex justify-content-between pb-2 mb-1">
                    <h4>Список</h4>
                    <button className="btn btn-outline-dark" onClick={this.addListCreateItem}>
                        +
                    </button>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Пул адресов</th>
                        <th>{""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.list.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.range}</td>
                            <td>Проверить</td>
                        </tr>
                    ))}
                    {
                        this.state.newItems.map((item) => {
                            return item;
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }

    async addItem(item) {
        await fetch(`api/list/add/${item.name}/${item.range}`, {method: "POST"});
        this.setState({ isLoading: true});
    }

    async removeItem(item) {
        await fetch(`api/list/remove/${item.name}`, {method: "POST"});
        this.setState({ isLoading: true});
    }

    async getList() {
        const serverResult = await fetch(`api/list/list/`);
        const loadedResult = await serverResult.json();

        this.setState({ list: loadedResult, isLoading: false});
    }
}