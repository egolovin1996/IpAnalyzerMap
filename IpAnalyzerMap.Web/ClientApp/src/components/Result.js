import React, { Component } from "react";
import {
    Alert,
    Badge,
    Col,
    Collapse,
    Container,
    Row
} from "reactstrap";
import { SimpleTable } from "./SimpleTable";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

export class Result extends Component {
    constructor(props) {
        super(props);

        const colors = ["primary", "secondary", "success", "danger", "warning", "info"];
        
        function getRandomArbitrary(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        
        let colorNumber = getRandomArbitrary(0, colors.length);
        
        this.state = {
            collapsed: false,
            probable: "",
            locations: [],
            loading: true,
            color: colors[colorNumber]
        };
        

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        return this.getLocation();
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        let contents = this.state.loading ? (
            <Container>
                <Row>
                    <Col>Загрузка данных для ip адреса: <b>{this.props.ip}</b></Col>
                    <Col sm={{ offset: 1 }}>
                        <Loader type="ThreeDots" color="black" height={20} width={40} />
                    </Col>
                </Row>
            </Container>
        ) : (
            <div>
                <Container>
                    <Row>
                        <Col>Ip адрес: <b>{this.props.ip}</b> - наиболее вероятное местоположение: <b>{this.state.probable}</b></Col>
                        <Col sm={{ offset: 1 }}>
                            <Link target="_blank" to={`map/${this.props.ip}`}>
                                <Badge className="mr-1" color="success">
                                    Показать на карте
                                </Badge>
                            </Link>
                            <Badge
                                style={{ cursor: "pointer" }}
                                className="mr-1"
                                color="secondary"
                                onClick={this.toggle}
                            >
                                Детали
                            </Badge>
                        </Col>
                    </Row>
                </Container>
                <Collapse isOpen={this.state.collapsed}>
                    <SimpleTable locations={this.state.locations} />
                </Collapse>
            </div>
        );

        return <Alert color={this.state.color}>{contents}</Alert>;
    }

    async getLocation() {
        const ipAddress = this.props.ip;
        const response = await fetch(`api/location/getAllLocations/${ipAddress}`);
        const locations = await response.json();
        const probable = this.getProbable(locations);
        this.setState({ probable, locations, loading: false });
    }
    
    getProbable(data){
        const dict = {};
        data.forEach(item => {
            if(!item.city) return;
            
            if(dict[item.city]){
                dict[item.city]++;
            }else{
                dict[item.city] = 1;
            }
        });

        let max = 0;
        let result = "";
        for (let key in dict){
            if(dict[key] > max){
                max = dict[key];
                result = key;
            }
        }
        
        return result;
    }
}
