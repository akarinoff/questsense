import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router';
import { Button,ButtonAdd, PageContent } from '../components'
import { fetchApiToJson, runningThrowLoader, getString2Json, getReduxInitialState, getYappUrlReplace } from '../utils/AppUtils'
import { endpoint_public } from "../config/config";
import { showError, showInfo, hideMessage, setUserlogon, setInitalData, setErrorByServerSideModel ,setShowLoginForm } from '../my_redux/action'
import Carousel from 'react-bootstrap/Carousel';


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
    const intialData = useSelector((state) => state.intialData);
    const isShowLoginForm = useSelector((state) => state.isShowLoginForm);
    
    const listClass = intialData.listClass;
    const listUserFollowed = intialData.listUserFollowed;
    
    // const [isRunProgress, setIsRunProgress] = useState(true);
    // const [progress, setProgres] = useState(0);
    
    useEffect(() => {
        console.log("useEffect");
    }, []); // <-  [] เพื่อบอก React ว่า effect นี้ไม่ได้ขึ้นอยู่กับ props หรือ state ใดๆ เพื่อให้ไม่ต้อง re-run อีก

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('This will run every second!');
    //         clearInterval(interval);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         // console.log('This will run every second!');
    //         // clearInterval(interval);
            
    //         if(isRunProgress){
    //             if(progress==5){
    //                 setIsRunProgress(false);
    //                 setProgres(0);
    //             }
    //             else
    //                 setProgres(progress+1);
    //         }

    //     }, 1000);

    //     return () => clearInterval(interval);
        
    // }, [isRunProgress,progress]);

    // useEffect(() => {
    //     if(progress==5)
    //         setIsRunProgress(false);
    // }, [progress]);

    return (
        <>
        {/* {progress} */}

          <div style={{textAlign:'center'}}>
            <img src="/static/images/quenselogo.png" style={{maxWidth:'100%'}} />

            <h1 style={{color:'#AA8F37',fontWeight:'normal',marginTop:'0.5em'}}>
                QuestSense
            </h1>

            <h3 style={{fontWeight:'normal',marginTop:'0.5em'}}>
                Work with purpose. do with passion.
            </h3>

            <div style={{marginTop:'2em'}}>
                <div>
                    <Button onClick={()=>Router.push('/register')} variant="outline-secondary" caption={<><i className="fa fa-plus"></i> สร้างบัญชีผู้ใช้</>} style={{width:'200px'}} />
                </div>
                <div style={{marginTop:'1em'}}>
                    <Button onClick={()=>Router.push('/signin')} variant="outline-secondary" caption={<><i className="fa fa-sign-in"></i> ลงชื่อเข้าใช้</>} style={{width:'200px'}} />
                </div>
            </div>
            

            <div style={{marginTop:'1.5em',fontSize:'12px'}}>
                ลืมรหัสผ่าน ? &nbsp;<a href="#" onClick={()=>Router.push('/forgotpass')}>คลิกที่นี่</a>
            </div>

          </div>
        </>
    )
}
