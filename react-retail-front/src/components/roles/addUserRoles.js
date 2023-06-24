import React, { Component } from "react";
import new_config from '../../services/config';
import common from '../../services/commonFunctionsJS';
import swal from 'sweetalert';
import Header from '../header/header';
import TopBar from '../topBar/topBar';
import LeftBar from '../leftBar/leftBar';
import "react-datepicker/dist/react-datepicker.css";

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Cookies from 'universal-cookie';

export default class addUserRoles extends Component {
    constructor(props) {

        super(props);
        this.state = {
            Name: " ",
            store_list: [],
            Status: 0,
            zpl: '',
            remarks: "",
            storeid: ''
        };
    }


    componentDidMount = async () => {

        var stores = await common.get_stores();
        this.setState(store_list => ({ store_list: stores }));

    }
    async handleSubmit(event) {
        event.preventDefault();


        const server_ip = await new_config.get_server_ip();
        var cookies = new Cookies();
        var myToken = cookies.get('myToken');

        fetch(server_ip + 'stockCountRecords/AddZPL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'keep-alive',
                'auth-token': myToken
            },
            body: "name=" + this.state.Name +
                "&zpl=" + this.state.zpl +
                "&stoid=" + this.state.storeid +
                "&remarks=" + this.state.remarks +
                "&status=" + this.state.Status,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var temp = responseJson;
                if (temp.status == 1) {
                    swal({ title: temp.title, text: temp.text, icon: temp.icon })
                }
                this.props.history.push('/zplInfo')
            }).catch((error) => console.error(error)).finally();
    }
    render() {
        return (
            <>
                <Header />
                <TopBar />
                <div className="page-container">
                    <LeftBar />
                    <div className="content-wrapper pb-4">

                        <div className="row">
                            <div className="col-12 mt-1">
                                <div className="card">

                                    <div className="card-header">
                                        <div className="left d-inline-block">
                                            <h4 className="mb-0"> <i className="ti-stats-up" style={{ color: "#000" }}></i>
                                                User Roles
                                            </h4>
                                            <p className="mb-0 dateTime"></p>
                                        </div>
                                        <div className="right d-inline-block float-right mt-2">

                                            <img src="/asserts/images/count/Group 9.png" height='25px' />
                                            <span style={{ cursor: "pointer" }} className="button_print">
                                                <img src="/asserts/images/count/Icon feather-printer.png" height='30px' className="ml-1 mr-1" />
                                            </span>

                                            <span style={{ cursor: "pointer" }} className="buttons_excel2">
                                                <img src="/asserts/images/count/Group 10.png" height='30px' />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card-body">
                                            <form autoComplete="off" id="AddDeviceForm" name="registration" onSubmit={this.handleSubmit.bind(this)}>
                                                <span className="error_msg"></span>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="Name">Name *</label>
                                                        <input type="text" className="form-control" name="Name"
                                                            id="Name" placeholder="Name"
                                                            defaultValue={this.state.Name}
                                                            onChange={(e) => this.setState({ Name: e.target.value })} />
                                                        <span className="error Name_error"></span>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label for="GroupName">Role name *</label>
                                                        <input type="text" class="form-control" name="RoleName" id="RoleName" placeholder="Role Name" />
                                                        <span class="error RoleName_error"></span>
                                                    </div>
                                                    <div className="form-group col-md-12" style={{ textAlign: "center" }}>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="but mt-5">
                                                                    <button type="submit" id="submit" className="btn btn-primary btn-block">Add ZPL</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div >
                </div>
            </>

        )
    }
}
