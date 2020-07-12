import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import BusinessItem from './BusinessItem';
import { getBusinesses, getBusinessBySearchCriteria } from '../../actions/businessActions';



class Businesses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            errors: {},
          };
        this.searchClicked = this.searchClicked.bind(this);
        this.searchChanged = this.searchChanged.bind(this);
      }

    componentDidMount () {
        if (this.props.match.params.criteria) {
            this.props.getBusinessBySearchCriteria(this.props.match.params.criteria)
        } else {
            this.props.getBusinesses();
        }
    }
    searchChanged (e) {
        this.setState({search: e.target.value})
    }
    searchClicked(e) {
        if (this.state.search != "") {
           window.location.href = window.location.origin+'/hiring/search/'+this.state.search
            this.props.getBusinessBySearchCriteria(this.state.search)
        } else {
            this.props.getBusinesses();  
        }
      }
  render() {
    const { businesses } = this.props.businesses;
    if(businesses){
      businesses.forEach(function(business) {
          if (business.description) {
            business.description = business.description.substring(0, 400);
            if( business.description.length > 399) {
              business.description = business.description + "..."
            }
          }
      });
    }

    let businessItems;

    if(businesses === null) {
        businessItems = <Spinner />
    } else {
        if(businesses.length > 0) {
            businessItems = businesses.map(business => (
                <BusinessItem key={business._id} business={business} />
            ))
        } else {
            businessItems = <h4>No businesses Found...</h4>
        }
    }

    return (
        <div className="positions">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Businesses in your network</h1>
                        <p className="lead text-center">
                        Support Businesses owned by Sigmas and Zetas
                        </p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Job Title or Keywords" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={ this.searchChanged }></input>
                            <div className="input-group-append">
                                <button type='button' className="input-group-text" id="search" onClick={this.searchClicked}>search</button>
                            </div>
                       </div>           
                        {businessItems}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}

Businesses.propTypes = {
    getBusinesses: PropTypes.func.isRequired,
    getBusinessBySearchCriteria: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    businesses: state.business
})

export default connect(mapStateToProps, { getBusinesses, getBusinessBySearchCriteria })(Businesses);
