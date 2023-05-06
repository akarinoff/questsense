import React from 'react'
import Router from 'next/router';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingDialog, DialogMessage } from '../components'
import LogoutComponent from "./LogoutComponent";
import { HeadTag } from '.'

let Template = function (props) {
  let { children} = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading)
  const errorByServerSideModel = useSelector((state) => state.errorByServerSideModel);
  return (
    <>
      <LoadingDialog isShow={loading} />
      <DialogMessage />
      <HeadTag />

      {!errorByServerSideModel.isErrorByServerSide &&
        <>
          {props.children}
        </>
      }
      {errorByServerSideModel.isErrorByServerSide &&
        <>
          <div className="bgMain widthMain" style={{ padding: '2em' }}>

            <a href="#" onClick={()=>Router.push("/")}><img src="/static/Images/logo.png" alt="" className="pt-3 pb-3" /></a>

            <h1 style={{ color: '#FFF', textAlign: 'center' }}>
              {errorByServerSideModel.errorServerSideMessage}

              {errorByServerSideModel.errorServerSideMessage.includes("Unauthorized")&&
                <LogoutComponent />
              }
            </h1>

            <div style={{textAlign:'center'}}>
              <a href="/" className="btn btn-primary">Back to home</a>
            </div>
          </div>
        </>
      }
    </>
  )
}
export default Template;
