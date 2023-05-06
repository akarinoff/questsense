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

    const onLogin = () =>{

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
          <div style={{maxWidth:(userLogon==null)?'300px':'500px',margin:'auto',padding:'auto',textAlign:'center'}}>

            <div style={{marginBottom:'1em' ,textAlign:'center'}}>
              <img src="/static/images/quenselogo.png" style={{maxWidth:'180px'}} />
            </div>

            <div>
              <h3 style={{marginBottom:'0.7em'}}>
                <i className="fa fa-check" style={{color:'green'}}></i> สร้างบัญชีเสร็จสิ้น
              </h3>
              <div style={{marginBottom:'0.7em'}}>
                คุณสามารถลงชื่อเข้าสู่ระบบได้แล้ว
              </div>
              
              <div>
                ไปที่หน้าเข้าสู่ระบบ &nbsp;<a href="#" onClick={()=>Router.push('/signin')}>คลิกที่นี่</a>
              </div>
              
            </div>

    
            {/* {step!="CHOOSE_MODE"&& */}
            {/* <div style={{marginTop:'3em',textAlign:'center'}}>
                  <Button type='button' onClick={()=>Router.push('/')} variant="outline-secondary" caption={<><i class="fa fa-home"></i> หน้าแรก</>} />
              </div> */}
            {/* } */}
          </div>

        </>
    )
}
