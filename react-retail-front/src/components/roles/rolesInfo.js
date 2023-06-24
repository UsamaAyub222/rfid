import React, { Component } from "react";
import new_config from '../../services/config';
import { Link } from "react-router-dom";

import Header from '../header/header';
import TopBar from '../topBar/topBar';
import LeftBar from '../leftBar/leftBar';
import "react-datepicker/dist/react-datepicker.css";

//jQuery libraries

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';


import Cookies from 'universal-cookie';

export default class rolesInfo extends Component {
  constructor(props) {

    super(props);

  }


  componentDidMount = async () => {


    const server_ip = await new_config.get_server_ip();
    var main_table = ' ';
    var cookies = new Cookies();

    var myToken = cookies.get('myToken');
    console.log(myToken)


    $(document).ready(function () {

      main_table = $('#dataTable').DataTable({
        dom: 'Bfrtip',

        buttons: [
          {
            extend: 'excel',
            title: 'AsnData'
          }, {

            extend: 'print',
            title: 'AsnData'
          },
        ],
        "pageLength": 25,
        'processing': true,
        'serverSide': true,
        "initComplete": function (settings, json) {
          $(".data-tables").css('visibility', 'visible');
          //$(".before_load_table").hide();
        },
        'language': {
          'loadingRecords': '&nbsp;',
          'processing': '&nbsp; &nbsp; Please wait... <br><div class="spinner"></div>'
        },

        'serverMethod': 'post',
        'ajax': {
          'url': server_ip + 'stockCountRecords/GetUserRoles/',
          'beforeSend': function (request) {
            request.setRequestHeader("auth-token", myToken);
          },
        },
        "order": [[1, 'desc']],
        "responsive": true,
        "columns": [
          { "data": "role_id" },
          { "data": "role_name" },
          // { "data": "storename" },
          { "data": "createddate" },
          { "data": "viewpermissions" },
          { "data": 'action' },
        ],
        "searching": false,
        "select": true
      });
    });


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
                      <div className="filters pl-1 pt-3 pb-3 pr-3" id="executiveSummaryFitler">
                        <div className="mb-0 filter-size">

                          <div className="d-inline-block mr-4 mb-05 my-2">
                            <Link to="/addUserRoles.js" type="button" id="" className="btn btn-danger BtnAdd">Add User</Link>
                          </div>

                        </div>

                      </div>
                      <div class="data-tables">
                        <table id="dataTable" class="text-center mm-datatable" style={{ width: "100%" }}>
                          <thead class="bg-light text-capitalize">
                            <tr>
                              <th>ID</th>
                              <th>Role Name</th>
                              <th>Created Date</th>
                              <th>Permissions</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div >
              </div >
            </div >
          </div >
        </div >
      </>
    )
  }
}
