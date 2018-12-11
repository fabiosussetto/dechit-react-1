import React from 'react'
import {Link} from 'react-router-dom';

const Modal = () => {

    return (
        <div className="modal" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Status of the transaction</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                    Transaction successfully saved
                </div>

                <div className="modal-footer">
                    <Link to="/"><button type="button" className="btn btn-primary mr-2">Home</button></Link>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Modal