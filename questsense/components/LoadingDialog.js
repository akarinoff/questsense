import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function myfunc({isShow}){
  if(isShow==true){
      return(
        <div style={myStyle.loadingAjax}>
          <div style={myStyle.imgLoading}>
            
            {/* <Spinner animation="grow" variant="primary" /> */}
            <Spinner animation="grow" variant="secondary" />
            {/* <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" /> */}

          </div>
          {/* <img src="/static/imgs/Ellipsis-1s-200px.gif" alt="Loading..." style={myStyle.imgLoading} /> */}
        </div>
      )
    }else
      return(<div></div>)
}

const myStyle = {
  loadingAjax:{
    textAlign: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    zIndex: '99999',
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
  },
  imgLoading:{
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius:'40px',
    width:'260px',
    maxWidth:'100%',
    position: 'fixed',
    top: '38%',
    right:'41%',
  },
}
