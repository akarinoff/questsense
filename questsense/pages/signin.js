import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router';
import { PageContent ,Button ,Textbox ,TextArea ,ButtonSave} from '../components'
import { fetchApiToJson, runningThrowLoader, getString2Json, getReduxInitialState, getYappUrlReplace } from '../utils/AppUtils'
import { endpoint_public } from "../config/config";
import { showError, showInfo, hideMessage, setUserlogon, setInitalData, setErrorByServerSideModel ,setShowLoginForm } from '../my_redux/action'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import NumberFormat from 'react-number-format'
import { PatternFormat } from 'react-number-format';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

import { getFirestore ,collection, doc, setDoc ,addDoc ,getDocs ,getDoc ,query, where,and,or,getDocFromCache } from "firebase/firestore"; 
import { firebaseConfig} from "../config/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export async function getServerSideProps(context) {
    let reduxStore = getReduxInitialState(context);
    const { dispatch } = reduxStore;

    // let json = []
    // try {
    //     let fetchParam = {
    //         url: endpoint_public + "/api/webinitial/home",
    //         method: 'post',
    //         dispatch: dispatch,
    //         req: context.req,
    //     }
    //     json = await fetchApiToJson(fetchParam);
    //     if (json.status == 200) {
    //         dispatch(setInitalData(json));
    //     } else
    //         dispatch(setErrorByServerSideModel({ isErrorByServerSide: true, errorServerSideMessage: json.message }));
    // } catch (ex) {
    //     dispatch(setErrorByServerSideModel({ isErrorByServerSide: true, errorServerSideMessage: ex.toString() }));
    // }

    return {
        props: {
            // ...json,
            initialReduxState: reduxStore.getState(),
            template: "frontendnew",
        },
    }
}

export default function Myfunc(props) {
    const dispatch = useDispatch();
    const logon = useSelector((state) => state.logon);
    
    const [step, setStep] = useState("CHOOSE_MODE");
    const [progress, setProgres] = useState(0);
    
    const [loginModel, setLoginModel] = useState({
      phoneNumber : '',
      password : '',
    });
    
    const [userLogon, setUserlogon] = useState(null);

    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');

    useEffect(() => {
        console.log("useEffect");
        
        // const app = initializeApp(firebaseConfig);
        
        // const auth = getAuth();
        // auth.languageCode = 'th';

        // window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        //   'size': 'invisible',
        //   'callback': (response) => {
        //     // reCAPTCHA solved, allow signInWithPhoneNumber.
        //     onSignInSubmit();
        //   }
        // }, auth);
        

        // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

        // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        //     'size': 'invisible',
        //     'callback': (response) => {
        //         console.log("FFFFFFFFFFFFFFF");
        //       console.log(response)
        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //       // ...
        //     },
        //     'expired-callback': () => {
        //         console.log("VVVVVVVVVVVVV");
        //       // Response expired. Ask user to solve reCAPTCHA again.
        //       // ...
        //     }
        //   }, auth);

    }, []); // <-  [] เพื่อบอก React ว่า effect นี้ไม่ได้ขึ้นอยู่กับ props หรือ state ใดๆ เพื่อให้ไม่ต้อง re-run อีก
    

    const onChagneloginModel = (e) =>{
      setLoginModel({...loginModel,[e.target.name]:e.target.value});
    }

    const onLogin = (e=null) =>{
      if (e != null)
        e.preventDefault();

        // alert(loginModel.phoneNumber)

        // +66 092 369 4641

      runningThrowLoader(true, dispatch, async () => {
        if(loginModel.phoneNumber==null||loginModel.phoneNumber=="")
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุเบอร์โทรศัพท์"));
        else if(loginModel.password==null||loginModel.password=="")
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุรหัสผ่าน"));
        else{

          let listByName = [];
          {
            const q = query(collection(db, "users"), where("phoneNumber", "==", loginModel.phoneNumber), where("password", "==", loginModel.password));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              listByName.push({...doc.data()});
            });
          }

          if(listByName.length==0)
            dispatch(showError("User not found.","ไม่พบข้อมูลสมาชิก"));
          else{
            let userLogon = listByName[0];
            setUserlogon(userLogon);
            // alert(JSON.stringify(listByName));
          }

        }
      });
    }

    return (
        <>
          <div style={{maxWidth:(userLogon==null)?'300px':'500px',margin:'auto',padding:'auto'}}>

            <div style={{marginBottom:'1em' ,textAlign:'center'}}>
              <img src="/static/images/quenselogo.png" style={{maxWidth:'230px'}} />
            </div>

            {userLogon==null&&
              <div>
                <h3 style={{marginBottom:'0.7em',textAlign:'center'}}>
                  เข้าสู่ระบบ
                </h3>
                
                <div style={{marginBottom:'1em'}}>
                  
                  <form onSubmit={onLogin}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-lg-12">



                      {/* <PatternFormat format="+66 ### ### ####" allowEmptyFormatting mask="_" className="fomr-control"
                       name='phoneNumber' value={loginModel.phoneNumber} onChange={onChagneloginModel} />; */}

                        
          {/* <NumberFormat
            format="(+66) ###-###-####"
            mask="_"
            isNumericString={true}
            allowEmptyFormatting={true}
            customInput={(props) => {
              return (
                <Form.Group controlId="ind_phone" className="mb-3">
                  <Form.Label>India phone number</Form.Label>
                  <Form.Control size="sm" {...props} />
                </Form.Group>
              )
            }}
          /> */}



                        <Textbox placeholder="เบอร์โทรศัพท์..." errMsgByName = {loginModel.errmsgs}  size="lg"
                          name='phoneNumber' value={loginModel.phoneNumber} maxLength={10} onChange={onChagneloginModel} />
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">
                          <Textbox placeholder="รหัสผ่าน..." errMsgByName = {loginModel.errmsgs}  size="lg"
                            name='password' type="password" value={loginModel.password} onChange={onChagneloginModel} />
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12" style={{textAlign:'right',fontSize:'12px'}}>
                        ลืมรหัสผ่าน ? &nbsp;<a href="#" onClick={()=>Router.push('/forgotpass')}>คลิกที่นี่</a>
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12" style={{textAlign:'center'}}>
                      <Button onClick={onLogin} variant="primary" caption={<><i className="fa fa-sign-in"></i> เข้าสู่ระบบ</>} style={{width:'100%'}} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            }

            {userLogon!=null&&
              <div>
                <h4 style={{marginBottom:'0.7em',textAlign:'center'}}>
                  <div>
                    ยินดีต้อนรับ
                  </div>
                  <div>
                    {userLogon.firstname} {userLogon.lastname}
                  </div>
                </h4>

                <h2 style={{marginTop:'1.5em',textAlign:'center'}}>
                  พบกันกับ QuestSense เร็วๆ นี้
                </h2>

                <div style={{textAlign:'center',marginTop:'1.5em'}}>
                  <div>อิสระชีวิต</div>
                  <div>อิสระในการจ้างงาน</div>
                  <div>อิสระใหม่แห่งการทำงาน</div>
                </div>
                
                
                
                {/* <div style={{marginBottom:'1em',padding:'1em',backgroundColor:"#FFF",color:"#000",borderRadius:'10px',boxShadow:'2px 2px 2px 2px #000'}}>
                  
                  <div className="row">

                    <div className="col-3 col-sm-3 col-lg-3">ชื่อ.</div>
                    <div className="col-9 col-sm-9 col-lg-9">
                      {userLogon.firstname}
                    </div>
                    
                    <div className="col-3 col-sm-3 col-lg-3">นามสกุล.</div>
                    <div className="col-9 col-sm-9 col-lg-9">
                      {userLogon.lastname}
                    </div>
                    
                    <div className="col-3 col-sm-3 col-lg-3">เบอร์โทรศัพท์.</div>
                    <div className="col-9 col-sm-9 col-lg-9">
                      {userLogon.phoneNumber}
                    </div>
                    {userLogon.firstRegisterType=="quester"&&
                      <>
                        <div className="col-3 col-sm-3 col-lg-3">ความถนัด.</div>
                        <div className="col-9 col-sm-9 col-lg-9">
                          {userLogon.ability}
                        </div>
                      </>
                    }
                  </div>
                </div> */}
              </div>
            }
          
    
            {/* {step!="CHOOSE_MODE"&& */}
            <div style={{marginTop:'3em',textAlign:'center'}}>
                  <Button type='button' onClick={()=>Router.push('/')} variant="outline-secondary" caption={<><i class="fa fa-home"></i> หน้าแรก</>} />
              </div>
            {/* } */}
          </div>

        {/* step */}
          {/* Index
          
          <div
            id="sign-in-button"
            className="justify-center flex"
            style={{height:'200px',width:'200px'}}
        ></div>  
          
          <div
            id="recaptcha-container"
            className="justify-center flex"
            style={{height:'500px',width:'500px'}}
        ></div>    

          <div>
            <Button onClick={()=>onRegister} caption="click" />
          </div>
          
      <input type="phoneNumber" value={loginModel.phoneNumber} name="phoneNumber" onChange={onChagneloginModel} />
      <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleVerifyCode}>Verify Code</button> */}
        </>
    )
}
