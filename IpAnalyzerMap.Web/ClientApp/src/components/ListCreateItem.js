import React, { Component } from "react";

export class ListCreateItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            range: ""
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleCreate = (e) => {
        e.preventDefault();
        
        const { name, range } = this.state;
        if (name && range) {
            this.props.add({
                name,
                range
            })
        }
    };

    render(){
        const { name,  range } = this.state;

        return(
            <tr>
                <th scope="row">
                    <input type="text" className="form-control form-control-sm"
                           placeholder="Название"
                           name="name"
                           value={name}
                           onChange={this.handleChange} />
                </th>
                <td>
                    <input type="text" className="form-control form-control-sm"
                           placeholder="Диапазон"
                           name="range"
                           value={range}
                           onChange={this.handleChange} />
                </td>
                <td className="text-right">
                    <button className="btn btn-sm fa fa-floppy-o"
                            aria-hidden="true"
                            onClick={this.handleCreate}>
                        ok
                    </button>
                    <button className="btn btn-sm"
                            aria-hidden="true"
                            onClick={this.props.remove}>
                        x
                    </button>
                </td>
            </tr>
        );
    }
}
