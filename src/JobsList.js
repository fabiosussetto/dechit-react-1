import React, { Component } from 'react';
import { connect } from "react-redux";

const Job = (props) => {
  const { job } = props
  console.log(job);
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{ job.title.rendered }</h5>
        <div className="card-text" dangerouslySetInnerHTML={{__html: job.excerpt.rendered}} />
        <a href={`mailto:recruitment@dechit.it?subject=${ job.title.rendered }`} className="btn btn-primary btn-small mt-3">Candidati</a>
      </div>
    </div>
  )
}

class JobsList extends Component {

  render() {
    const { jobs } = this.props
    if (jobs.loading) {
      return (
        <div className="d-flex XXX-justify-content-center align-items-center">
          Loading...
        </div>
      )
    }
    const PostElem = jobs.list.map((job,index) => (
      <Job
        job={job}
        key={index}
      />
    ))

    return (
      <React.Fragment>
        { jobs.loading && 'Loading...' }
        {PostElem}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps)(JobsList);
