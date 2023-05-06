
// import Cookies from 'js-cookie';
import { cookieToken } from '../config/config';

export function setUserlogon (token,userLogon) {
  let userJsonText = null;
  if(userLogon!=null)
    userJsonText = JSON.stringify(userLogon);
  return { type: "logon", value:{token : token ,user:userLogon ,userJsonText:userJsonText}}
}

export function setDlagFrontMini (model) {
  return { type: "dlgFrontMini", value:model}
}
 
export function logout () {
  Cookies.remove(cookieToken); // library นี้ใช้ไม่ได้ มันเอาไว้ clear cookie client พอมันอยู่ใน getServerSideProps มันจะไม่ได้เคลีย มันแค่เข้า redux เอา user ออก
  return { type: "logon", value:{token : null ,user:null ,userJsonText:null}}
}

export function setIsLogoutNow (val) {
  return { type: "isLogoutNow", value:val}
}

export function setProfileUserModel (model) {
  return { type: "profileUserModel", value:model}
}

export function setInitalData (model) {
  return { type: "intialData", value:model}
}

export function setShowLoginForm (isShowLoginForm) {
  return { type: "isShowLoginForm", value:isShowLoginForm}
}

export function setErrorByServerSideModel (model) {
  return { type: "errorByServerSideModel", value:model}
}

// export function setCarts (model) {
//   Cookies.set(cookieCarts ,JSON.stringify(model));
//   return { type: "carts", value:model}
// }

export function setOpenHamMenu (isOpen) {
  return { type: "openHamMenu", value:isOpen}
}

export function showDlgCarts () {
  return { type: "isShowDlgCarts", value:true}
}

export function hideDlgCarts () {
  return { type: "isShowDlgCarts", value:false}
}

export function setMapKeyModalOpening (mapKeyModalOpening) {
  return { type: "mapKeyModalOpening", value:mapKeyModalOpening}
}

export function showLoading () {
  return { type: "loading", value : true}
}

export function hideLoading () {
  return { type: "loading", value : false}
}

export function setMenuMinimize (val) {
  return { type: "menuMinimize", value : val}
}

export function showInfo (title,detail) {
  return setMessage(title,detail,"info",true,false);
}

export function showWarnning (title,detail) {
  return setMessage(title,detail,"warnning",true,false);
}

export function showError (title,detail) {
  return setMessage(title,detail,"error",true,false);
}

export function showException (e) {
  return setMessage("ERROR",e.toString(),"error",true,true);
}

export function hideMessage () {
  return setMessage("","","",false,false);
}

function setMessage(title,detail,status,isShow,isException){
  let dlgMessage = {
    isShow:isShow,
    isException:isException,
    status:status,
    title:title,
    detail:detail,
  }
  return { type: "dlgMessage", value : dlgMessage}
}