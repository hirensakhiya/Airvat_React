import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import * as actions from "./actions";
import ReactTable from "react-table";
import moment from 'moment';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
      filtered: [],
    }
  }
  componentWillMount() {
    this.props.fetchToDos();
  }

  handleApply = (event, picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }
  customFilter = (filter, row) => {
    console.log("filter", filter);
    console.log("row", row);
    const id = filter.pivotId || filter.id;
    console.log(id);
    if (row[id] !== null && typeof row[id] === "string") {
      return (row[id] !== undefined
        ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
        : true);
    }
  }

  rendertodo() {
    const { data } = this.props;
    
    const columns = [{
      id: "FirstName",
      Header: 'FirstName',
      accessor: 'FirstName',
      filterable: true,

    }, {
      Header: 'LastName',
      accessor: 'SurName',
      filterable: true
    },
    {
      Header: 'Email',
      accessor: 'Email',
      filterable: true
    },
    {
      Header: 'RecidenceCity',
      accessor: 'RecidenceCity',
      filterable: true
    },
    {
      Header: 'RecidenceCountry',
      accessor: 'RecidenceCountry',
      filterable: true
    },
    {
      id: 'LastActive',
      Header: 'LastActive',
      accessor: d => {
        return moment(d.LastActive)
          .local()
          .format("DD/MM/YY hh:mm a")
      },
      filterable: true,

    },]

    return (
      <div className="container center-align">
        <h3 style={{ marginLeft: '20px', marginTop: '30px' }}>Airvat User Lookup</h3>
        <div className="col s10 offset-s1 center-align" style={{ marginTop: '30px' }}>
          <ReactTable data={data} columns={columns} defaultPageSize={5} defaultSorted={[
            {
              id: "FirstName",
              desc: false
            }
          ]} defaultFilterMethod={this.customFilter}
            filtered={this.state.filtered}
            onFilteredChange={filtered => this.setState({ filtered })}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col s10 offset-s1 " >
        {this.rendertodo()}
      </div>

    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data: data.UserData
  };
};

export default connect(mapStateToProps, actions)(App);
