import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router';
import { PageContent ,Button ,Textbox ,TextArea ,ButtonSave} from '../components'
import { fetchApiToJson, runningThrowLoader, getString2Json, getReduxInitialState, getYappUrlReplace } from '../utils/AppUtils'
import { endpoint_public } from "../config/config";
import { showError, showInfo, hideMessage, setUserlogon, setInitalData, setErrorByServerSideModel ,setShowLoginForm } from '../my_redux/action'
import Carousel from 'react-bootstrap/Carousel';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber } from "firebase/auth";

import { getFirestore ,collection, doc, setDoc ,addDoc ,updateDoc ,getDocs ,getDoc ,query, where,and,or,getDocFromCache } from "firebase/firestore"; 
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
    
    const [step, setStep] = useState("INPUT_PHONE");
    const [progress, setProgres] = useState(0);
    
    const [dataModel, setDataModel] = useState({
      phoneNumber : '',
      otp : '',
      password : '',
      passwordConfirm : '',
    });
    const [docId, setDocId] = useState("");
    
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
    
    useEffect(() => {
      if(step=="INPUT_PHONE"){
        setProgres(0);
      }
      else if(step=="INPUT_OTP"){
        setProgres(50);
      }
      else if(step=="INPUT_PASSWORD"){
        setProgres(80);
      }

    }, [step]);

    const onChagnedataModel = (e) =>{
      setDataModel({...dataModel,[e.target.name]:e.target.value});
    }

    const generateRecaptcha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container" ,{
        'size':'invisible',
        'callback' : (response) => {
          
        }
      }, auth);
    }

    const onSave = async (e=null) => {
      if (e != null)
        e.preventDefault();

      if(step=="INPUT_PHONE"){
  
        runningThrowLoader(true, dispatch, async () => {
          if(dataModel.phoneNumber==null||dataModel.phoneNumber=="")
            dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุเบอร์โทรศัพท์"));
          else{
  
            let listByName = [];
            {
              const q = query(collection(db, "users"), where("phoneNumber", "==", dataModel.phoneNumber));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                setDocId(doc.id);
                listByName.push({...doc.data()});
              });
            }
  
            if(listByName.length==0)
              dispatch(showError("User not found.","ไม่พบข้อมูลสมาชิก"));
            else{
              generateRecaptcha();
              
              let appVerifier = window.recaptchaVerifier;
              signInWithPhoneNumber(auth ,"+66" + dataModel.phoneNumber ,appVerifier).then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                setStep("INPUT_OTP");
                // alert("sended");
              }).catch((error) => {
                console.log(error);
              });
            }
          }
        });

      }
      else if(step=="INPUT_OTP"){
  
        if(dataModel.otp.length === 6){
          // console.log(otp);
          let confirmationResult = window.confirmationResult;
          confirmationResult.confirm(dataModel.otp).then((result) => {
            const user = result.user;
            setStep("INPUT_PASSWORD");
          }).catch((error) => {
            // console.log(error);
            dispatch(showError("รหัสไม่ถูกต้อง","รหัสไม่ถูกต้อง"));
          });
        }
        
      }
      else if(step=="INPUT_PASSWORD"){


        runningThrowLoader(true, dispatch, async () => {
          if(dataModel.password==null||dataModel.password=="")
            dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุรหัสผ่าน"));
          else if(dataModel.passwordConfirm==null||dataModel.passwordConfirm=="")
            dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุยืนยันรหัสผ่าน"));
          else if(dataModel.password!=dataModel.passwordConfirm)
            dispatch(showError("ยืนยันรหัสผ่านไม่ถูกต้อง","ยืนยันรหัสผ่านไม่ถูกต้อง"));
          else{
            const washingtonRef = doc(db, "users", docId);
    
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
              // phoneNumber: registerModel.phoneNumber,
              // firstname: registerModel.firstname,
              // lastname: registerModel.lastname,
              // firstRegisterType: registerModel.firstRegisterType,
              // ability: registerModel.ability,
              password: dataModel.password,
            });

            dispatch(showInfo("บันทึกเรียบร้อย","บันทึกเรียบร้อย กรุณาเข้าสู่ระบบ"));
            Router.push('/signin')
          }
        });

      }
    }

    return (
        <>
          <div style={{maxWidth:'300px',margin:'auto',padding:'auto'}}>

            <div style={{marginBottom:'1em' ,textAlign:'center'}}>
              <img src="/static/images/quenselogo.png" style={{maxWidth:'230px'}} />
            </div>

            <h3 style={{marginBottom:'0.7em',textAlign:'center'}}>
              Forgot password
            </h3>
            
            <div style={{marginBottom:'1em'}}>

              <div style={{marginBottom:'1.5em',marginTop:"1.5em",textAlign:'center'}}>
                <ProgressBar variant="success" now={progress} />
              </div>

              {step=="INPUT_PHONE"&&
                <div>
                  <form onSubmit={onSave}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-lg-12">
                        <Textbox placeholder="ระบุเบอร์โทรศัพท์..." errMsgByName = {dataModel.errmsgs} size="gl"
                          name='phoneNumber' maxLength={10} value={dataModel.phoneNumber} onChange={onChagnedataModel} />
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                      <div className="col-12 col-sm-12 col-lg-12" style={{textAlign:'center'}}>
                        <Button variant="success" onClick={onSave} caption={<>ต่อไป <i className="fa fa-arrow-right"></i></>} />
                      </div>
                    </div>
                  </form>
                </div>
              }


              {step=="INPUT_OTP"&&
                <div>
                  <form onSubmit={onSave}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-lg-12">
                        <h4>
                          Enter verification code
                        </h4>
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12" style={{color:"#5A6470"}}>
                        We sent you a verification code via SMS.
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">

                        <Textbox errMsgByName = {dataModel.errmsgs} 
                          name='otp' value={dataModel.otp} onChange={onChagnedataModel} />
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                      <div className="col-12 col-sm-12 col-lg-12" style={{textAlign:'center'}}>
                        <Button variant="success" onClick={onSave} caption={<>ต่อไป <i className="fa fa-arrow-right"></i></>} />
                      </div>
                    </div>
                  </form>
                </div>
              }


              {step=="INPUT_PASSWORD"&&
                <div>
                  <form onSubmit={onSave}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-lg-12">
                        <Textbox caption="รหัสผ่านใหม่" type="password" errMsgByName = {dataModel.errmsgs} 
                          name='password' value={dataModel.password} onChange={onChagnedataModel} />
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">
                        <Textbox caption="ยืนยันรหัสผ่านใหม่" type="password" errMsgByName = {dataModel.errmsgs} 
                          name='passwordConfirm' value={dataModel.passwordConfirm} onChange={onChagnedataModel} />
                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                      <div className="col-12 col-sm-12 col-lg-12" style={{textAlign:'center'}}>
                          <ButtonSave onClick={onSave} caption={"บันทึก"} style={{width:'100%'}} />
                      </div>
                    </div>
                  </form>
                  
                </div>
              }

              {/* {step!="CHOOSE_MODE"&& */}
                <div style={{marginTop:'3em',textAlign:'center'}}>
                    <Button type='button' onClick={()=>Router.push('/')} variant="outline-secondary" caption={<><i class="fa fa-home"></i> หน้าแรก</>} />
                </div>
              {/* } */}
            </div>
          
            <div id="recaptcha-container"></div>
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
          
      <input type="phoneNumber" value={dataModel.phoneNumber} name="phoneNumber" onChange={onChagnedataModel} />
      <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleVerifyCode}>Verify Code</button> */}
        </>
    )
}
