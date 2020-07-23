import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import BlogItem from './BlogItem';
import { getBlogs} from '../../actions/contentActions';



class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            errors: {},
          };
        // this.searchClicked = this.searchClicked.bind(this);
        // this.searchChanged = this.searchChanged.bind(this);
      }

    componentDidMount () {
        // if (this.props.match.params.criteria) {
        //     this.props.getBusinessBySearchCriteria(this.props.match.params.criteria)
        // } else {
            this.props.getBlogs();
        // }
    }
    // searchChanged (e) {
    //     this.setState({search: e.target.value})
    // }
    // searchClicked(e) {
    //     if (this.state.search != "") {
    //        window.location.href = window.location.origin+'/blogs/search/'+this.state.search
    //         this.props.getBusinessBySearchCriteria(this.state.search)
    //     } else {
    //         this.props.getBusinesses();  
    //     }
    //   }
  render() {
    const { blogs } = this.props;
    console.log(blogs)
    // if(blogs){
    //   blogs.forEach(function(blog) {
    //       if (blog.about) {
    //         blog.about = blog.about.substring(0, 400);
    //         if( blog.about.length > 399) {
    //           blog.about = blog.about + "..."
    //         } 
    //       } else {
    //         blog.about = "No description added yet"
    //     }
    //   });
    // }

    let blogItems;

    if(blogs === null) {
        blogItems = <Spinner />
    } else {
        if(blogs.length > 0) {
            blogItems = blogs.map(blog => (
                <BlogItem key={blog.userId} blog={blog} />
            ))
        } else {
            blogItems = <h4>No Blog Found...</h4>
        }
    }

    return (
        <div className="blogs">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Blogs in your network</h1>
                        <p className="lead text-center">
                        Support Blogs by Sigmas and Zetas
                        </p>
                        {/* <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Job Title or Keywords" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={ this.searchChanged }></input>
                            <div className="input-group-append">
                                <button type='button' className="input-group-text" id="search" onClick={this.searchClicked}>search</button>
                            </div>
                       </div>            */}
                        {blogItems}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}

Blogs.propTypes = {
    getBlogs: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    blogs: state.content.blogs
})

export default connect(mapStateToProps, { getBlogs })(Blogs);
