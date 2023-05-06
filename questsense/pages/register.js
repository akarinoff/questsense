import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router';
import { PageContent ,Button ,Textbox ,TextArea ,Combobox ,ButtonSave} from '../components'
import { fetchApiToJson, runningThrowLoader, getString2Json, getReduxInitialState, getYappUrlReplace } from '../utils/AppUtils'
import { endpoint_public ,firebaseConfig} from "../config/config";
import { showError, showInfo, hideMessage, setUserlogon, setInitalData, setErrorByServerSideModel,showLoading,hideLoading } from '../my_redux/action'
import Carousel from 'react-bootstrap/Carousel';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore ,collection, doc, setDoc ,addDoc ,getDocs ,getDoc ,query, where,and,or,getDocFromCache } from "firebase/firestore"; 
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber } from "firebase/auth";

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

const countdownOTPMax = 120;

export default function Myfunc(props) {
    const dispatch = useDispatch();
    const logon = useSelector((state) => state.logon);
    
    const [step, setStep] = useState("CHOOSE_MODE");
    const [progress, setProgres] = useState(0);

    
    const [isCountdownOTP, setIsCountdownOTP] = useState(false);
    const [countdownOTP, setCountdownOTP] = useState(countdownOTPMax);
    
    const [registerModel, setRegisterModel] = useState({
      phoneNumber : '',
      firstname : '',
      lastname : '',
      password : '',
      passwordConfirm : '',
      firstRegisterType : '',
      ability : '',
      province : "ระยอง",
      amphur : "",
      otp : '',
    });
    
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
      let interval = setInterval(() => {
          // console.log('This will run every second!');
          // clearInterval(interval);
          
          if(isCountdownOTP){
              if(countdownOTP==1){
                setIsCountdownOTP(false);
                setCountdownOTP(countdownOTPMax);
              }
              else
                setCountdownOTP(countdownOTP - 1);
          }

      }, 1000);

      return () => clearInterval(interval);
      
  }, [isCountdownOTP ,countdownOTP]);

    
  useEffect(() => {
    if(step=="CHOOSE_MODE")
      setProgres(0);
    else if(step=="INPUT_PHONE")
      setProgres(20);
    else if(step=="INPUT_OTP")
      setProgres(40);
    else if(step=="INPUT_PASSWORD")
      setProgres(60);
    else if(step=="INPUT_DATA")
      setProgres(80);

  }, [step]);

  const onChagneRegisterModel = (e) =>{
    setRegisterModel({...registerModel,[e.target.name]:e.target.value});
  }

  const onChooseStep = (firstRegisterType) =>{
    setRegisterModel({...registerModel,firstRegisterType:firstRegisterType});
    setStep("INPUT_PHONE");
  }

  const onBack = (e=null) => {
    setIsCountdownOTP(false);

    if(step=="INPUT_PHONE"){
        setStep("CHOOSE_MODE");
    }
    else if(step=="INPUT_OTP"){
      setStep("INPUT_PHONE");
    }
    else if(step=="INPUT_PASSWORD"){
      setStep("INPUT_PHONE");
    }
    else if(step=="INPUT_DATA"){
      setStep("INPUT_PASSWORD");
    }
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container" ,{
      'size':'invisible',
      'callback' : (response) => {
        
      }
    }, auth);
  }

  const onSendSms = (callBackSuccess=null) => {
    
    dispatch(showLoading());
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth ,"+66" + registerModel.phoneNumber ,appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult;

      setIsCountdownOTP(true);
      setCountdownOTP(countdownOTPMax);

      if(callBackSuccess!=null)
        callBackSuccess();

      dispatch(hideLoading());
    }).catch((error) => {
      console.log(error);
      dispatch(hideLoading());
    });
    
    // setIsCountdownOTP(true);
    // setCountdownOTP(countdownOTPMax);

    // if(callBackSuccess!=null)
    //   callBackSuccess();
  }

  const onSave = (e=null) => {
    if (e != null)
      e.preventDefault();
    // const q = query(collection(db, "users"), where("firstname", "==", registerModel.firstname), where("lastname", "==", registerModel.lastname));

    // const q = query(collection(db, "cities"), and(where("state", "==", "CA"),where("name", "==", "Los Angelesddd")));

    // const q = query(collection(db, "cities"), and(
    //   where('state', '==', 'CA'),   
    //   or(
    //     where('capital', '==', true),
    //     where('population', '>=', 1000000)
    //   )
    // ));

    if(step=="INPUT_PHONE"){

      runningThrowLoader(true, dispatch, async () => {
        if(registerModel.phoneNumber==null||registerModel.phoneNumber=="")
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุเบอร์โทรศัพท์"));
        else{

          let listByPhone = [];
          {
            const q = query(collection(db, "users"), where("phoneNumber", "==", registerModel.phoneNumber));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              listByPhone.push({...doc.data()});
            });
          }

          if(listByPhone.length>0)
            dispatch(showError("ข้อมูลซ้ำ","เบอร์โทรศัพท์ซ้ำ ไม่สามารถสมัครสมาชิกได้"));
          else{
            onSendSms(()=>{
              setStep("INPUT_OTP");
            });
            
            // setStep("INPUT_OTP");
            
          }
        }
      });

    }
    else if(step=="INPUT_OTP"){

      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(registerModel.otp).then((result) => {
        const user = result.user;
        setStep("INPUT_PASSWORD");
      }).catch((error) => {
        // console.log(error);
        dispatch(showError("รหัสไม่ถูกต้อง","รหัสไม่ถูกต้อง"));
      });
      
      // setStep("INPUT_PASSWORD");
      
    }
    else if(step=="INPUT_PASSWORD"){

      if(registerModel.password==null||registerModel.password=="")
        dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุรหัสผ่าน"));
      else if(registerModel.passwordConfirm==null||registerModel.passwordConfirm=="")
        dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุยืนยันรหัสผ่าน"));
      else if(registerModel.password!=registerModel.passwordConfirm)
        dispatch(showError("ยืนยันรหัสผ่านไม่ถูกต้อง","ยืนยันรหัสผ่านไม่ถูกต้อง"));
      else{
        setStep("INPUT_DATA");
      }
      
      // setStep("INPUT_DATA");

    }else if(step=="INPUT_DATA"){

      
        if(registerModel.firstname==null||registerModel.firstname=="")
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุชื่อ-นามสกุลให้ครบ"));
        else if(registerModel.lastname==null||registerModel.lastname=="")
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุชื่อ-นามสกุลให้ครบ"));
        else if(registerModel.firstRegisterType=="quester"&&(registerModel.province==null||registerModel.province==""))
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุจังหวัด"));
        else if(registerModel.firstRegisterType=="quester"&&(registerModel.amphur==null||registerModel.amphur==""))
          dispatch(showError("ข้อมูลไม่ครบ","กรุณาระบุอำเภอ"));
        else {
          runningThrowLoader(true, dispatch, async () => {

            let listByName = [];
            {
              const q = query(collection(db, "users"), and(where("firstname", "==", registerModel.firstname), where("lastname", "==", registerModel.lastname)));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                listByName.push({...doc.data()});
              });
            }
            if(listByName.length>0)
              dispatch(showError("ข้อมูลซ้ำ","ชื่อ - นามสกุลซ้ำ ไม่สามารถสมัครสมาชิกได้"));
            else{
              const docRef = await addDoc(collection(db, "users"), {
                phoneNumber: registerModel.phoneNumber,
                firstname: registerModel.firstname,
                lastname: registerModel.lastname,
                password: registerModel.password,
                firstRegisterType: registerModel.firstRegisterType,
                ability: registerModel.ability,
                province: registerModel.province,
                amphur: registerModel.amphur,
              });
  
              // dispatch(showInfo("สมัครสมาชิกเรียบร้อย","สมัครสมาชิกเรียบร้อย กรุณาเข้าสู่ระบบ"));
              Router.push('/registered')
            }
          });

        }
    }
  }

  return (
      <>
        <div>

          <div style={{marginBottom:'1em' ,textAlign:'center'}}>
            <img src="/static/images/quenselogo.png" style={{maxWidth:'230px'}} />
          </div>

          <h3 style={{marginBottom:'0.7em',textAlign:'center'}}>
            สร้างบัญชีผู้ใช้
          </h3>
          
          <div style={{marginBottom:'1em'}}>
            
            {step=="CHOOSE_MODE"&&
              <div>
                <div className="row">
                  <div className="col-6 col-sm-6 col-lg-6">
                    <Button onClick={()=>onChooseStep('quester')} variant="primary" caption={<><i className="fa fa-edit"></i> หางาน</>} style={{width:'100%',height:'50px'}} />
                  </div>
                  <div className="col-6 col-sm-6 col-lg-6">
                    <Button onClick={()=>onChooseStep('requester')} variant="success" caption={<><i className="fa fa-child"></i> หาคน</>} style={{width:'100%',height:'50px'}} />
                  </div>
                </div>
              </div>
            }

            {step!="CHOOSE_MODE"&&
              <div style={{marginBottom:'1.5em',marginTop:"1.5em",textAlign:'center'}}>
                <ProgressBar variant="success" now={progress} />
                {/* <ProgressBar striped variant="success" now={progress} /> */}
              </div>
            }

            {step=="INPUT_PHONE"&&
              <div>
                <form onSubmit={onSave}>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12">
                        <Textbox caption='เบอร์โทรศัพท์' placeholder="เบอร์โทรศัพท์..." errMsgByName = {registerModel.errmsgs} 
                          name='phoneNumber' maxLength={10} value={registerModel.phoneNumber} onChange={onChagneRegisterModel} />
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'right'}}>
                        <Button type='button' onClick={onBack} variant="danger" caption={<><i className="fa fa-arrow-left"></i> กลับ</>} />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'left'}}>
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
                    <div className="col-9 col-sm-9 col-lg-9">
                      <Textbox errMsgByName = {registerModel.errmsgs} 
                        name='otp' value={registerModel.otp} onChange={onChagneRegisterModel} />
                    </div>
                    <div className="col-3 col-sm-3 col-lg-3">
                      <Button type='button' onClick={()=>onSendSms(null)} variant="primary" disabled={isCountdownOTP} caption={(!isCountdownOTP)?"ส่งใหม่":countdownOTP} style={{width:'100%'}} />
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12" style={{color:"#5A6470",textAlign:'center'}}>
                      
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'right'}}>
                        <Button type='button' onClick={onBack} variant="danger" caption={<><i className="fa fa-arrow-left"></i> กลับ</>} />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'left'}}>
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
                      <Textbox caption="รหัสผ่าน" type="password" errMsgByName = {registerModel.errmsgs} 
                        name='password' value={registerModel.password} onChange={onChagneRegisterModel} />
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12">
                      <Textbox caption="ยืนยันรหัสผ่าน" type="password" errMsgByName = {registerModel.errmsgs} 
                        name='passwordConfirm' value={registerModel.passwordConfirm} onChange={onChagneRegisterModel} />
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'right'}}>
                        <Button type='button' onClick={onBack} variant="danger" caption={<><i className="fa fa-arrow-left"></i> กลับ</>} />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'left'}}>
                        <Button variant="success" onClick={onSave} caption={<>ต่อไป <i className="fa fa-arrow-right"></i></>} />
                    </div>
                  </div>
                </form>
                
              </div>
            }

            {step=="INPUT_DATA"&&
              <div>
                <form onSubmit={onSave}>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12">
                        <Textbox errMsgByName = {registerModel.errmsgs} caption='ชื่อ' placeholder="ชื่อ..."
                          name='firstname' value={registerModel.firstname} onChange={onChagneRegisterModel} />
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12">
                        <Textbox caption='นามสกุล' placeholder="นามสกุล..." errMsgByName = {registerModel.errmsgs} 
                          name='lastname' value={registerModel.lastname} onChange={onChagneRegisterModel} />
                    </div>
                    {registerModel.firstRegisterType=="quester"&&
                      <>
                        <div className="col-12 col-sm-12 col-lg-12">
                            <Textbox caption='จังหวัด' value={registerModel.province} disabled={true} />
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12">
                            <Combobox caption='อำเภอ' errMsgByName = {registerModel.errmsgs} 
                              name='amphur' value={registerModel.amphur} onChange={onChagneRegisterModel}>
                                <option value="">-- เลือก --</option>
                                <option value="เมือง">เมือง</option>
                                <option value="บ้านฉาง">บ้านฉาง</option>
                                <option value="แกลง">แกลง</option>
                                <option value="วังจันทร์">วังจันทร์</option>
                                <option value="บ้านค่าย">บ้านค่าย</option>
                                <option value="ปลวกแดง">ปลวกแดง</option>
                                <option value="เขาชะเมา">เขาชะเมา</option>
                                <option value="นิคมพัฒนา">นิคมพัฒนา</option>
                            </Combobox>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-12">
                            <TextArea caption='ความถนัด' errMsgByName = {registerModel.errmsgs} 
                              name='ability' value={registerModel.ability} onChange={onChagneRegisterModel} />
                        </div>
                      </>
                    }
                    <div className="col-12 col-sm-12 col-lg-12">&nbsp;</div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'right'}}>
                        <Button type='button' onClick={onBack} variant="danger" caption={<><i className="fa fa-arrow-left"></i> กลับ</>} />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-6" style={{textAlign:'left'}}>
                        <ButtonSave onClick={onSave} caption={"บันทึก"} />
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
        
    <input type="phoneNumber" value={registerModel.phoneNumber} name="phoneNumber" onChange={onChagneRegisterModel} />
    <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
    <button onClick={handleVerifyCode}>Verify Code</button> */}
      </>
  )
}
