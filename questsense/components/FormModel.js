import React from 'react';
import {ButtonCancel,ButtonSave,Button} from '../components'
import Modal from 'react-bootstrap/Modal'

export default function  myfunc({isShow,size="lg",title,isEmptyPanel=false,onHide=function(){},onSave=null,captionSave=null,onDelete=null,children,className="formDataModal"}){
  return(
    <Modal
      className = {className}
      show={isShow}
      onHide={onHide}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      {!isEmptyPanel&&
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
      }
      <Modal.Body>
        {children}
      </Modal.Body>
      {!isEmptyPanel&&
        <Modal.Footer>
          {onSave!=null && 
            <ButtonSave onClick={onSave} caption={captionSave} />
          }
          {onDelete!=null && 
            <Button typeAntd="danger" onClick={onDelete} iconLeft="delete" />
          }
          {onHide!=null && 
            <ButtonCancel onClick={onHide} caption="ปิด" />
          }
        </Modal.Footer>
      }
    </Modal>
  )
}
