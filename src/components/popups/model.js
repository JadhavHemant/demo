import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
// import { object } from 'prop-types';


class model extends Component {
constructor(props){
    super(props);

}

    render() {
        const {closeModal,obj} = this.props;
        Modal.setAppElement(document.getElementById('app'));
        const customStyles = {
            content : {
                width:'600px',
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              backgroundColor       :'#fafafa'
            }
          };
        return (
            <div>
              
                {/* <button onClick={()=>this.prpos.openModal()}>Open Modal</button> */}
        <Modal 
          isOpen={this.props.modalIsOpen}
          onAfterOpen={null}
          className="col-md-6 col-lg-6 col-xs-12 col-sm-12"
          onRequestClose={closeModal}
          style={customStyles}
          aria={{
            labelledby: "heading",
            describedby: "full_description"
          }}
          contentLabel="Example Modal"
        >
 

          <form className="col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{backgroundColor:'#afafaf'}}>
          {Object.keys(obj).length > 0 ?<h6>{obj.Name}</h6>:""}
         <hr />
                 <div className="form-group" >
                     <div style={{wordBreak:'break-word'}}>
                            {Object.keys(obj).length > 0 ?<p style={{fontSize:'18px',fontFamily:''}}>{obj.remark}</p>:""}
                    </div>
       </div>
       <button type="button" className="btn-primary" onClick={closeModal}>close</button>         
          </form>
        </Modal>
            </div>
        );
    }
}
model.propTypes = {
    styles: PropTypes.object,
    obj :PropTypes.object,
    closeModal: PropTypes.func
  };
export default model;
