import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import {Button,Textbox,Passwordbox} from '../components';
import {fetchApiToJson,runningThrowLoader} from '../utils/AppUtils'
// import Cookies from 'js-cookie';
import {cookieToken ,endpoint_authen} from '../config/config';
import { showLoading } from '../my_redux/action';

export default function Login(){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const dispatch = useDispatch();

  const onLogin = async(e) =>{
    e.preventDefault();
    
    await runningThrowLoader(true ,dispatch, async ()=>{
      let fetchParam = {
        url : endpoint_authen+'/api/authen/login',
        method : 'post',
        dispatch : dispatch,
        req : null,
        formId : "formM",
        isNot200ToThrow : true,
      }

      let json = await fetchApiToJson(fetchParam);
      await Cookies.set(cookieToken ,json.token);
      window.location = "/backend"
      // location.reload();
    })
  }


  return(
    <form id='formM' onSubmit={onLogin}>
      <div style={{padding:"0.8em",paddingTop:'0em',paddingBottom:'1.5em',fontSize:'14px'}}>

        <div className="row">
          <div className="col-12 col-sm-12 col-lg-12" style={{paddingTop:'1em'}}>
            <Textbox placeholder={'Username'} iconLeft="user" name='user_name' value={username} 
              onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className="col-12 col-sm-12 col-lg-12" style={{paddingTop:'1em'}}>
            <Passwordbox placeholder={'Password'} iconLeft="lock" name='pass_word' value={password} 
              onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="col-12 col-sm-12 col-lg-12" style={{textAlign:'center',paddingTop:'1.5em'}}>
            <center>
              <Button variant="dark" type="submit" onClick={onLogin} style={{width:'100%'}}
                className="success" caption='เข้าสู่ระบบ' iconRight='sign-in' />
            </center>
          </div>
        </div>
      </div>
    </form>
  )
}

