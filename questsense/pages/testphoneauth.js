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
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";

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
    
    const [phoneNumber ,setPhoneNumber] = useState("+66");
    const [expandForm ,setExpandForm] = useState(false);
    const [OTP ,setOTP] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    auth.languageCode = 'th';

    useEffect(() => {
        console.log("useEffect");
        
    }, []); // <-  [] เพื่อบอก React ว่า effect นี้ไม่ได้ขึ้นอยู่กับ props หรือ state ใดๆ เพื่อให้ไม่ต้อง re-run อีก

    const generateRecaptcha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container" ,{
        'size':'invisible',
        'callback' : (response) => {
          
        }
      }, auth);
    }
    
    const requestOTP = (e) => {
      e.preventDefault();
      if(phoneNumber.length >= 12){
        setExpandForm(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth ,phoneNumber ,appVerifier).then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          alert("sended");
        }).catch((error) => {
          console.log(error);
        })
      }
    }

    const verifyOTP = (e) => {
      let otp = e.target.value;
      setOTP(otp);

      if(otp.length === 6){
        console.log(otp);
        let confirmationResult = window.confirmationResult;
        alert(confirmationResult);
        confirmationResult.confirm(otp).then((result) => {
          const user = result.user;
        }).catch((error) => {
          console.log(error);
        });
      }
    }

    return (
      <>
        <div className="formContainer">
          <form onSubmit={requestOTP}>

            <div>Phone : </div>
            <input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />

            {expandForm === true?
              <>
                <div>OTP : </div>
                <input type="text" value={OTP} onChange={verifyOTP} />
              </>
              :
              null
            }

            {expandForm==false?
              <button type='submit'>Request OTP</button>
              :
              null
            }
            <div id="recaptcha-container"></div>
          </form>
        </div>
      </>
    )
}
