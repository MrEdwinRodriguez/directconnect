import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
  render() {
    const { experience, education, business } = this.props;

    const expItems = experience.map( exp => (
     <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="MM/YYYY">{exp.from}</Moment> - 
        {exp.current === true ? (' Current') : <Moment format="MM/YYYY">{exp.to}</Moment>}
      </p>
      <p><strong>Position:</strong> {exp.title}</p>
      <p>
        {exp.location === "" ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
      </p>
      <p>
        {exp.description=== "" ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
      </p>
     </li>
  ))

  let eduItems ="";
  if (!isEmpty(education)) {
    eduItems = education.map( edu => (
      <li key={edu._id} className="list-group-item">
       <h4>{edu.school}</h4>
       <p>
         <Moment format="MM/YYYY">{edu.from}</Moment> - 
         {edu.current === true ? (' Current') : <Moment format="MM/YYYY">{edu.to}</Moment>}
       </p>
       <p><strong>Degree:</strong> {edu.degree}</p>
       <p><strong>Field Of Stufy:</strong> {edu.fieldofstudy}</p>
       <p>
         {edu.description=== "" ? null : (<span><strong>Description: </strong>{edu.description}</span>)}
       </p>
      </li>
   ))
  }

  
 let busiItems = [];
  if(!isEmpty(business)) {
    busiItems = business.map( busi => (
      <li key={busi._id} className="list-group-item">
      <h4>{busi.name}</h4>
      <p><strong>Title:</strong> {busi.title}</p>
      <p><strong>Website:</strong> {busi.website}</p>
      <p><strong>Location:</strong> {busi.location}</p>
      <p>
        {busi.description=== "" ? null : (<span><strong>Description: </strong>{busi.description}</span>)}
      </p>
      </li>
    ))
  }
    return (
      <div className='row'>
        <div className="col-md-4">
          <h3 className="text-center text-royal">Experience</h3>
            {expItems.length > 0 ? (
              <ul className='list-group'>{expItems}</ul>
            ) : (
              <p className='text-center'>No Experience Listed</p>
            )}
        </div>

        <div className="col-md-4">
          <h3 className="text-center text-royal">Education</h3>
            {eduItems.length > 0 ? (
              <ul className='list-group'>{eduItems}</ul>
            ) : (
              <p className='text-center'>No Education Listed</p>
            )}
        </div>

        <div className="col-md-4">
          <h3 className="text-center text-royal">Business</h3>
            {busiItems.length > 0 ? (
              <ul className='list-group'>{busiItems}</ul>
            ) : (
              <p className='text-center'>No Business Listed</p>
            )}
        </div>
 
      </div>

    )
  }
}

export default  ProfileCreds;