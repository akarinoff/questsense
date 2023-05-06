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

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore ,collection, doc, setDoc ,addDoc ,getDocs ,getDoc ,query, where,and,or,getDocFromCache } from "firebase/firestore"; 
import { firebaseConfig} from "../config/config";

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
    
    const [file, setFile] = useState(null);

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

    // function readFileDataAsBase64(e) {
    //   const file = e.target.files[0];

    const onChangeFile = (e) =>{
      
      setFile(e.target.files[0]);

      // alert(file.name);


    }

    const onUploadFile = (e) => {
      
      const app = initializeApp(firebaseConfig);

      const storage = getStorage(app);
      const storageRef = ref(storage, "ssss/"+file.name);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        console.log(JSON.stringify(snapshot.metadata));
        console.log("fullPath = "+snapshot.metadata.fullPath);
        console.log("name = "+snapshot.metadata.name);
        console.log("size = "+snapshot.metadata.size);
      });
    }

    return (
        <>
          <div style={{maxWidth:(userLogon==null)?'300px':'500px',margin:'auto',padding:'auto'}}>

            <div style={{marginBottom:'1em' ,textAlign:'center'}}>
              <img src="/static/images/quenselogo.png" style={{maxWidth:'230px'}} />
            </div>


            <input type="file" onChange={onChangeFile} />

            <Button onClick={onUploadFile} variant="primary" caption={<><i className="fa fa-sign-in"></i> Sign in</>} style={{width:'100%'}} />
    
            {/* {step!="CHOOSE_MODE"&& */}
            <div style={{marginTop:'3em',textAlign:'center'}}>
                  <Button onClick={()=>Router.push('/')} variant="outline-secondary" caption={<><i class="fa fa-home"></i> หน้าแรก</>} />
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
