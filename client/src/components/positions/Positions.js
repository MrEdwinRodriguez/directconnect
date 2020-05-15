import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import PositionItem from './PositionItem';
import { getPositionsHiringByOrginization } from '../../actions/positionActions';
import { getPositionsHiring, getPositionsBySearchCriteria } from '../../actions/hiringActions';

class Positions extends Component {
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
        if(this.props.match.params.criteria) {
            this.props.getPositionsBySearchCriteria(this.props.match.params.criteria)
        } else {
            this.props.getPositionsHiring();
        }
    }
    searchChanged (e) {
        this.setState({search: e.target.value})
    }
    searchClicked(e) {
        if (this.state.search != "") {
            window.location.href = window.location.origin+'/hiring/search/'+this.state.search
            this.props.getPositionsBySearchCriteria(this.state.search)
        } else {
            this.props.getPositionsHiring();  
        }
      }
  render() {
    const {loading, positions } = this.props.position;
   
    if(positions){
      positions.forEach(position => {
          position.description = position.description.substring(0, 400);
          if( position.description.length > 399) {
            position.description = position.description + "..."
          }
      });
    }

    let positionItems;

    if(positions === null || loading) {
        positionItems = <Spinner />
    } else {
        if(positions.length > 0) {
            positionItems = positions.map(position => (
                <PositionItem key={position._id} position={position} />
            ))
        } else {
            positionItems = <h4>No Positions Found...</h4>
        }
    }

    return (
        <div className="positions">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Positions in your network</h1>
                        <p className="lead text-center">
                        Browse positions in your network.
                        </p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Job Title or Keywords" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={ this.searchChanged }></input>
                            <div className="input-group-append">
                                <button type='button' className="input-group-text" id="search" onClick={this.searchClicked}>search</button>
                            </div>
                       </div>           
                        {positionItems}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}

Positions.propTypes = {
    getPositionsHiring: PropTypes.func.isRequired,
    getPositionsHiringByOrginization: PropTypes.func.isRequired,
    getPositionsBySearchCriteria: PropTypes.func.isRequired,
    position: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    position: state.position
})

export default connect(mapStateToProps, { getPositionsHiring, getPositionsHiringByOrginization, getPositionsBySearchCriteria })(Positions);
