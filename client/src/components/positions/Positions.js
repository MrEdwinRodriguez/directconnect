import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import PositionItem from './PositionItem';
import { getPositionsHiring, getPositionsHiringByOrginization } from '../../actions/positionActions';


class Positions extends Component {
    componentDidMount () {
        if(this.props.match.params.orginization) {
            this.props.getPositionsHiringByOrginization(this.props.match.params.orginization)
        } else {
            this.props.getPositionsHiring();
        }
    }
  render() {
    const {loading, positions } = this.props.position;
   
    if(positions){
      console.log(positions)
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
    position: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    position: state.position
})

export default connect(mapStateToProps, { getPositionsHiring, getPositionsHiringByOrginization })(Positions);
