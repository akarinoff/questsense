import { useState, useEffect, useMemo } from "react";
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
// import Alert from 'react-bootstrap/Alert';
// import Modal from 'react-bootstrap/Modal';
// import Cookies from 'js-cookie';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { LoadingDialog, DialogMessage } from '../components'
import { cookieToken, endpoint_authen, endpoint_live, endpoint_public } from '../config/config';
import { logout, showInfo, setIsLogoutNow ,setShowLoginForm } from '../my_redux/action'
import { fetchApiToJson, runningThrowLoader, getString2Json, getReduxInitialState, getYappUrlReplace } from '../utils/AppUtils'
// import { Html, Head, Main, NextScript } from 'next/document'

import Head from 'next/head'
import LogoutComponent from "./LogoutComponent";
var md5 = require('md5');
var numeral = require('numeral');

let Template = function (props) {
  const dispatch = useDispatch();
  const logon = useSelector((state) => state.logon);
  const isLogoutNow = useSelector((state) => state.isLogoutNow);
  const mapKeyModalOpening = useSelector((state) => state.mapKeyModalOpening);
  const loading = useSelector((state) => state.loading);
  const initialDataModel = useSelector((state) => state.initialDataModel);
  const errorByServerSideModel = useSelector((state) => state.errorByServerSideModel);
  const intialData = useSelector((state) => state.intialData);
  const isShowLoginForm = useSelector((state) => state.isShowLoginForm);

  const [loginModel, setLoginModel] = useState({ user_login: "", user_pass: "" });

  const [showDlgRegister, setDlgShowRegister] = useState(false);
  const [registerModel, setRegisterModel] = useState({ user_login: "", user_pass: "", user_pass2: "", sms_code: "" });

  const [showDlgForgetpass, setDlgShowForgetpass] = useState(false);
  const [forgetpassModel, setForgetpassModel] = useState({ user_login: "", user_pass: "", user_pass2: "", sms_code: "" });

  useEffect(() => {
    console.log("useEffect");

    // ไม่ได้วะ template front อยู่ใน app.js มันไม่ทำงาน จะไปทำในปกติก็ไม่ได้ แม่งไม่ render 5555
    // if(isLogoutNow){
    //   alert("isLogoutNow");

    //   dispatch(setIsLogoutNow(false));
    //   dispatch(logout());
    // }

    // setIsLogoutNow

  }, []); // <-  [] เพื่อบอก React ว่า effect นี้ไม่ได้ขึ้นอยู่กับ props หรือ state ใดๆ เพื่อให้ไม่ต้อง re-run อีก

  // const closeDlgLogin = () => {
  //   dispatch(setShowLoginForm(false));
  // }

  // const onChangeLoginModel = (e) => {
  //   setLoginModel({ ...loginModel, [e.target.name]: e.target.value });
  // }

  // const onLogin = async (e) => {
  //   e.preventDefault();

  //   await runningThrowLoader(true, dispatch, async () => {
  //     let fetchParam = {
  //       url: endpoint_authen + '/api/authen/login',
  //       method: 'post',
  //       dispatch: dispatch,
  //       isNot200ToThrow: true,
  //       params: { ...loginModel }
  //     }

  //     let json = await fetchApiToJson(fetchParam);
  //     await Cookies.set(cookieToken, json.token);
  //     // window.location = "/backend"
  //     location.reload();
  //   })
  // }

  // const onLogout = () => {
  //   runningThrowLoader(true, dispatch, async () => {
  //     let fetchParam = {
  //       url: endpoint_authen + '/api/authen/logout',
  //       method: 'post',
  //       dispatch: dispatch,
  //       isNot200ToThrow: true,
  //     }

  //     await fetchApiToJson(fetchParam);
  //     dispatch(logout());
  //     location.reload();
  //   })
  // }

  // const onStartLive = () => {
  //   runningThrowLoader(true, dispatch, async () => {
  //     let fetchParam = {
  //       url: endpoint_live + '/api/live/live_validate',
  //       method: 'post',
  //       dispatch: dispatch,
  //       isNot200ToThrow: true,
  //     }

  //     let json = await fetchApiToJson(fetchParam);
  //     Router.push('/live')
  //   })
  // }

  // const onShowRegister = () => {
  //   setRegisterModel({ user_login: "", user_pass: "", user_pass2: "", sms_code: "" });
  //   setDlgShowRegister(true);
  // }

  // const closeDlgRegister = () => {
  //   setDlgShowRegister(false);
  // }

  // const onChangeRegisterModel = (e) => {
  //   setRegisterModel({ ...registerModel, [e.target.name]: e.target.value });
  // }

  // const onSendSmsRegister = async (e) => {
  //   e.preventDefault();

  //   if (registerModel.user_login == null || registerModel.user_login == "")
  //     alert("กรุณาระบุเบอร์โทรศัพท์");
  //   else {
  //     await runningThrowLoader(true, dispatch, async () => {
  //       let fetchParam = {
  //         url: endpoint_public + '/api/register/sendSms/' + registerModel.user_login,
  //         method: 'post',
  //         dispatch: dispatch,
  //         isNot200ToThrow: true,
  //       }

  //       let json = await fetchApiToJson(fetchParam);
  //       alert("ส่งรหัสผ่านแล้ว");
  //       // await Cookies.set(cookieToken ,json.token);
  //       // window.location = "/backend"
  //       // location.reload();
  //       // setDlgShowRegister(false);
  //     });
  //   }
  // }

  // const onRegister = async (e) => {
  //   e.preventDefault();

  //   await runningThrowLoader(true, dispatch, async () => {
  //     let fetchParam = {
  //       url: endpoint_public + '/api/register/save',
  //       method: 'post',
  //       dispatch: dispatch,
  //       isNot200ToThrow: true,
  //       params: { ...registerModel, source: "WEBSITE" }
  //     }

  //     let json = await fetchApiToJson(fetchParam);
  //     showInfo("ลงทะเบียนเรียบร้อย", "ลงทะเบียนเรียบร้อย กรุณาเข้าสู่ระบบ");
  //     // await Cookies.set(cookieToken ,json.token);
  //     // window.location = "/backend"
  //     // location.reload();
  //     setDlgShowRegister(false);
  //   })
  // }

  // const onShowForgetpass = () => {
  //   setForgetpassModel({ user_login: "", user_pass: "", user_pass2: "", sms_code: "" });
  //   setDlgShowForgetpass(true);
  // }

  // const closeDlgForgetpass = () => {
  //   setDlgShowForgetpass(false);
  // }

  // const onChangeForgetpassModel = (e) => {
  //   setForgetpassModel({ ...forgetpassModel, [e.target.name]: e.target.value });
  // }

  // const onSendSmsForgotpass = async (e) => {
  //   e.preventDefault();

  //   if (forgetpassModel.user_login == null || forgetpassModel.user_login == "")
  //     alert("กรุณาระบุเบอร์โทรศัพท์");
  //   else {
  //     await runningThrowLoader(true, dispatch, async () => {
  //       let fetchParam = {
  //         url: endpoint_public + '/api/forgotpass/sendSms/' + forgetpassModel.user_login,
  //         method: 'post',
  //         dispatch: dispatch,
  //         isNot200ToThrow: true,
  //       }

  //       let json = await fetchApiToJson(fetchParam);
  //       alert("ส่งรหัสผ่านแล้ว");
  //       // await Cookies.set(cookieToken ,json.token);
  //       // window.location = "/backend"
  //       // location.reload();
  //       // setDlgShowRegister(false);
  //     })
  //   }
  // }

  // const onForgetpass = async (e) => {
  //   e.preventDefault();

  //   await runningThrowLoader(true, dispatch, async () => {
  //     let fetchParam = {
  //       url: endpoint_public + '/api/forgotpass/save',
  //       method: 'post',
  //       dispatch: dispatch,
  //       isNot200ToThrow: true,
  //       params: { ...forgetpassModel }
  //     }

  //     let json = await fetchApiToJson(fetchParam);
  //     dispatch(showInfo(json.title, json.message));
  //     // await Cookies.set(cookieToken ,json.token);
  //     // window.location = "/backend"
  //     // location.reload();
  //   })
  // }

  return (
    <>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>QuestSense</title>

      <link rel="icon" type="image/png" sizes="16x16" href="/static/imgs/favicon.ico" />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
        
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

      <link rel="stylesheet" href="/static/css/off-comp.css" />
      
      <link rel="stylesheet" href="/static/css/my_css.css" />
    </Head>

    <LoadingDialog isShow={loading} />
    <DialogMessage />

      
    <div className="widthMain" style={{padding:'1em',paddingTop:'4em'}}>
      {props.children}
    </div>

    </>
  )
}

export default Template
