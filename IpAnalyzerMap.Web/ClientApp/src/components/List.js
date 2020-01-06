import React, { Component } from "react";
import { Table } from "reactstrap";
import { ListCreateItem } from "./ListCreateItem";
import { MultiSearch } from "./MultiSearch"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

export class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            newItems: [],
            isLoading: false,
            activeItem: null,
        };
    }

    componentDidMount() {
        return this.getList();
    }

    addListCreateItem = () => {
        const { newItems } = this.state;
        const item = <ListCreateItem key={Date.now()}
                                     remove={() => this.removeListCreateItem(item)}
                                     add={async (newItem)  => {
                                         this.removeListCreateItem(item);
                                         await this.addItem(newItem);
                                         await this.getList();
                                     }}/>;
        newItems.push(item);
        this.setState({ newItems });
    };

    removeListCreateItem = (item) => {
        const { newItems } = this.state;
        const result = newItems.filter((newItem) => newItem.key !== item.key);
        this.setState({ newItems: result });
        console.log(this.state);
    };
    
    render() {
        return(
            <div>
                <div className="d-flex justify-content-between pb-2 mb-1">
                    <h4>Список адресов</h4>
                    <button className="btn btn-outline-dark" onClick={this.addListCreateItem}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th style={{width: "25vw"}}>Наименование</th>
                        <th>Пул адресов</th>
                        <th>{""}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.list.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.range}</td>
                            <td className="text-right">
                                <button className="btn btn-sm fa fa-floppy-o"
                                        aria-hidden="true"
                                        onClick={() => this.setState({activeItem: item})}>
                                    <FontAwesomeIcon icon={faSearch} size="lg" color="#337ab7"/>
                                </button>
                                <button className="btn btn-sm"
                                        aria-hidden="true"
                                        onClick={async () => {
                                            await this.removeItem(item);
                                            await this.getList();
                                        }}>
                                    <FontAwesomeIcon icon={faTimes} size="lg" color="red"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {
                        this.state.newItems.map((item) => {
                            return item;
                        })
                    }
                    </tbody>
                </Table>
                {this.state.activeItem
                    ? (
                        <MultiSearch range={this.state.activeItem.range}/>
                    ) 
                    : 
                    ("")
                    
                }
            </div>
        )
    }

    async addItem(item) {
        await fetch(`api/list/add/${item.name}/${item.range}`, {method: "POST"});
        this.setState({ isLoading: true});
    }

    async removeItem(item) {
        await fetch(`api/list/remove/${item.name}/${item.range}`, {method: "POST"});
        this.setState({ isLoading: true});
    }

    async getList() {
        const serverResult = await fetch(`api/list/all`);
        
        const loadedResult = await serverResult.json();
        console.log(loadedResult);

        this.setState({ list: loadedResult, isLoading: false});
    }
}