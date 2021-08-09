import { MDBCol, MDBIcon } from "mdbreact";
import React, { Component } from 'react';
import {DataContext} from '../Context';



class SearchBar extends Component {

  static contextType = DataContext;

  constructor(props){
    super(props)

    this.state = {
        searchItem:''
    }

    this.onChangeSearch = this.onChangeSearch.bind(this);
  }


  onChangeSearch = (event) => {
    this.setState({searchItem: event.target.value});

    if(event.target.value === ""){
      this.context.refreshProducts();
    }
    else{
      this.context.searchProduct(event.target.value.toUpperCase());
    }
  }



  render() {
    return (
      <MDBCol md="6">
        <form className="form-inline mt-2 mb-2">
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search..." aria-label="Search" onChange={this.onChangeSearch} value={this.searchItem}/>
        </form>
      </MDBCol>
    );
  }
}

export default SearchBar;