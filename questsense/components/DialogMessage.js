import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {connect} from 'react-redux'
import {hideMessage} from '../my_redux/action'
import {ButtonCancel,ButtonSave,Button} from '../components'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let DialogMessage = function (){

  const dispatch = useDispatch();
  const dlgMessage = useSelector((state) => state.dlgMessage)


  let color = '';
  let icon = <></>;
  if(dlgMessage.status=='info'){
    icon = <i className="fa fa-check"></i>;
    color = '#155624';
  }else if(dlgMessage.status=='warnning'||dlgMessage.status=='error'){
    icon = <i className="fa fa-ban"></i>;
    color = '#711C24';
  }

  return(
    <Modal
      show={dlgMessage.isShow}
      onHide={(e) => dispatch(hideMessage())}
      size="gl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Body>
        <h3 style={{color:color}}>
          {icon} {dlgMessage.title}
        </h3>
        <p style={{color:"#000"}}>
          {dlgMessage.detail}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonCancel onClick={() => dispatch(hideMessage())} caption="ปิด" />
      </Modal.Footer>
    </Modal>
  )
}

export default DialogMessage;
