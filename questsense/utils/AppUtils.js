  
//   import FormData from 'form-data';
  // import fetch from 'node-fetch';
//   import Cookies from 'js-cookie';
  import {cookieToken} from '../config/config';
  import {showError, showException, showLoading, hideLoading,logout,setUserlogon,setCarts,setListClass,setIsLogoutNow} from '../my_redux/action'
  import { isNull } from 'util';
  // import FileSaver from 'file-saver';
  import { initializeStore } from '../my_redux/store'
  // var Decimal = require('decimal');

  export function getReduxInitialState(context){
    const req = context.req;
    const isServer = !!req
  
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore;
  
    let token = (isServer)? req.cookies[cookieToken] : Cookies.get(cookieToken);
    // console.log("token = "+typeof token);
    // console.log("token = "+token);
    let userLogon = null;
    
    if(typeof token!='undefined'&&token!=null&&token!=''&&token!='undefined'){
      // console.log("tokenHalf = "+token);
      let tokenHalf = token.split(".")[1];
      var buf = Buffer.from(tokenHalf, 'base64'); // Ta-da
      userLogon = JSON.parse(buf.toString());
    }else
      token = null;
  
    if(userLogon!=null)
      dispatch(setUserlogon(token ,userLogon));

    // return reduxStore.getState();
    return reduxStore;
  }

  export async function runningThrowLoader(isShowLoad,dispatch,func) {
    if(isShowLoad)
      dispatch(showLoading());
    try {
      await func();
    } catch (e) {
      if(e.message!='dont_show_dialog_exception')
        dispatch(showException(e));
    } finally {
      if(isShowLoad)
        dispatch(hideLoading());
    }
  }
  
  export async function fetchApiMain(fetchParam) {
    let{req ,method,formId,url,fullUrl=null,params={},isCallExternalLink=false,formData=null} = fetchParam;

    let isServer = !!req;

    let form = (formData!=null)?formData:new FormData();
    if(formId!=null&&document.getElementById(formId)!=null)
      form = new FormData(document.getElementById(formId));

    for (const [key, value] of Object.entries(params)) {
      if(typeof form.get(key)=='undefined' || form.get(key)==isNull)
        form.append(key,value);
      else
        form.set(key,value);
    }

    let token = ((isServer)? req.cookies[cookieToken] : Cookies.get(cookieToken));
    if(typeof token=="undefined")
      token = "";

    let paramsend = {method : method}
    if(method.toUpperCase()=='POST'){
      paramsend['body'] = form;
      if(!isCallExternalLink)
        paramsend['headers'] = {
          // 'Content-Type' : 'application/x-www-form-urlencoded',
          Authorization: "Bearer "+token,
        };
    }

    // alert(endpoint);

    let urlSend = (fullUrl!=null)?fullUrl:url;
    // let urlSend = (fullUrl!=null)?fullUrl:endpoint + "/api"  + url;
    return await fetch(urlSend, paramsend);
  }

  export async function fetchApiToText(fetchParam) {
    let res = await fetchApiMain(fetchParam);
    return await res.text();
  }

  export async function fetchApiToJson(fetchParam) {
    let{req ,dispatch ,isNot200ToThrow=false} = fetchParam;
    let isServer = !!req;
    let res = await fetchApiMain(fetchParam);
    let resText = await res.text();
    
    // dispatch(setIsLogoutNow(true));
    
    if(resText=="Unauthorized"){

      // if(isServer){
      //   console.log("contextRes = "+contextRes);
      //   contextRes.setHeader('Set-Cookie', [
      //     serialize(cookieToken, '', {
      //       maxAge: -1,
      //       path: '/',
      //     }),
      //     // serialize('mytoken2', '', {
      //     //   maxAge: -1,
      //     //   path: '/',
      //     // }),
      //   ]);

      //   // res.writeHead(302, { Location: '/api/login' });
      //   // res.end();
      // }


      // res.clearCookie(cookieToken);
      dispatch(logout());

      if(isServer)
        dispatch(setIsLogoutNow(true));
      // dispatch(logout());
      // throw "ใช้งานเกินระยะเวลา กรุณาเข้าสู่ระบบใหม่";

      throw "Unauthorized Please Login";
    }

    let json = getString2Json(resText);

    // ถ้า token มี login ใหม่ หรือ expire ก็จะดีดไป login ใหม่ทันที
    if(json.status==440||json.status==449){
      dispatch(logout());
      
      if(isServer)
        dispatch(setIsLogoutNow(true));

      // response.clearCookie('username');
      // req.cookies[cookieToken]
      // res.clearCookie("key");

      throw json.message;
    }
    
    // ถ้า 500 ให้ error เสมอ เพราะเป็นรหัสที่ exception จากหน้า backend แน่ๆ
    if (json.status == 500){
      throw new Error('(B) '+json.message);
    }

    // นอกจาก 200 ให้โชว์ exception ซะ
    if(isNot200ToThrow&&json.status != 200){
      dispatch(showError(json.title,json.message))
      throw new Error('dont_show_dialog_exception');
    }

    return json;
  }

  export async function fetchApiToBlob(fetchParam) {
    let res = await fetchApiMain(fetchParam);
    return await res.blob();
  }

  export async function fetchApiBlobToSaveFile(fetchParam,fileName) {
    let res = await fetchApiMain(fetchParam);
    let blob = await res.blob();

    FileSaver.saveAs(blob, fileName);

    // donwload save ได้ทันที ต้องเก็บไว้ ขุมทรัพท์เลยนะ กว่าจะหาได้ที
    // var blob2 = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob2, "hello world.txt");
  }

  export function getRandomToColor(){
    let num = Math.floor(Math.random() * 4);
    let color = "#FFF";
    if(num==0)
      color = "#FF8080";
    else if(num==1)
      color = "#1F96D1";
    else if(num==2)
      color = "yellow";
    else if(num==3)
      color = "#57D057";
    return color;
  }

  export function getBorderProfileTopRank(index){
    let str = "3px solid ";
    if(index==0)
      return str + "#F5CB2E";
    else if(index==1)
      return str + "#E3E6EC";
    else if(index==2)
      return str + "#E5946E";
    return str + "#FFF";
  }

  export function getDateFormat(dateP,pattern,th = false){
    if(dateP==null||dateP=='')
      return null;


    let date = (typeof dateP == 'string')?new Date(dateP):dateP;
    
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) 
      dd='0'+dd;
    if(mm<10) 
      mm='0'+mm;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if(hours<10) 
      hours='0'+hours;
    if(minutes<10) 
      minutes='0'+minutes;
    if(seconds<10) 
      seconds='0'+seconds;

    let str = pattern;
    if(th){
      let yyyyTh = parseInt(yyyy);
      yyyyTh = yyyyTh + 543;
      str = str.replace("yyyy",yyyyTh);
      str = str.replace("yy",yyyyTh.toString().substr(-2));
    }else{
      str = str.replace("yyyy",yyyy);
      str = str.replace("yy",yyyy.toString().substr(-2));
    }

    str = str.replace("ปี",((parseInt(yyyy)+543)).toString().substr(-2));
    str = str.replace("MM",mm);
    str = str.replace("dd",dd);
    
    str = str.replace("HH",hours);
    str = str.replace("mm",minutes);
    str = str.replace("ss",seconds);
    return str;
  }

  export function getListDays(){
    let list = [];
    for(let x=1;x<=31;x++){
      let value = ((x+"").length==1)?"0"+x:x+"";
      list.push({text:value ,value:value});
    }
    return list;
  }

  export function getListMonths(){
    let list = [];
    list.push({text:"มกราคม" ,value:"01"});
    list.push({text:"กุมภาพันธ์" ,value:"02"});
    list.push({text:"มีนาคม" ,value:"03"});
    list.push({text:"เมษายน" ,value:"04"});
    list.push({text:"พฤษภาคม" ,value:"05"});
    list.push({text:"มิถุนายน" ,value:"06"});
    list.push({text:"กรกฎาคม" ,value:"07"});
    list.push({text:"สิงหาคม" ,value:"08"});
    list.push({text:"กันยายน" ,value:"09"});
    list.push({text:"ตุลาคม" ,value:"10"});
    list.push({text:"พฤศจิกายน" ,value:"11"});
    list.push({text:"ธันวาคม" ,value:"12"});
    return list;
  }

  export function getListMonthCaptionNumber(){
    let list = [];
    list.push({text:"01" ,value:"01"});
    list.push({text:"02" ,value:"02"});
    list.push({text:"03" ,value:"03"});
    list.push({text:"04" ,value:"04"});
    list.push({text:"05" ,value:"05"});
    list.push({text:"06" ,value:"06"});
    list.push({text:"07" ,value:"07"});
    list.push({text:"08" ,value:"08"});
    list.push({text:"09" ,value:"09"});
    list.push({text:"10" ,value:"10"});
    list.push({text:"11" ,value:"11"});
    list.push({text:"12" ,value:"12"});
    return list;
  }

  // export function getDiscountDecimal(number ,discountStr){
  //   try{
  //     if(discountStr==null||discountStr===""||typeof discountStr=='undefined')
  //       return 0;

  //     if(discountStr.includes("%")){
  //       let discount = discountStr.replace("%","");
  //       discount = discount.trim();

  //       // discount = parseFloat(discount);
  //       // return (number * discount) / 100;

  //       // ได้ 2 แบบ แบบบนกับแบบล่าง แต่อันล่างน่าจะโอเคกว่า กรณีตัวเลขมันเยอะๆ ปัญหาอาจจะน้อยกว่า
  //       return Decimal(number).mul(discount).div("100").toNumber();
  //     }else
  //       return parseFloat(discountStr);
  //   }catch(ex){
  //     return 0;
  //   }
  // }

  export function getListYears(){
    let list = [];
    for(let x = 2560;x<=new Date().getFullYear()+543+2;x++)
      list.push({text:x+"" ,value:x+""});
    return list;
  }

  export function getRandomInt(maxInt=100){
    return Math.floor(Math.random() * maxInt)
  }

  export function getDateNowFormat(pattern){
    return getDateFormat(new Date(),pattern);
  }

  export function getETPTextReplace(str){
    if(str==null||str=='')
      return "\u00a0"; // <-- &nbsp;
      
    // .replace(/\r?\n/g, '<br />')
    // return (str+"").replace(/1/g,"๑").replace(/2/g,"๒").replace(/3/g,"๓").replace(/4/g,"๔").replace(/5/g,"๕").replace(/6/g,"๖")
    //   .replace(/7/g,"๗").replace(/8/g,"๘").replace(/9/g,"๙").replace(/0/g,"๐");

    return str;
  }

  export function getString2Json(text){
    try{
      let json = JSON.parse(text);
      return json;
    }catch(e){
      throw text;
    }
  }

  export function getYappUrlReplace(url){
    if(url==null||url=="")
      return "https://yapp.live/default_thumb.jpg";
      
    else if(url.includes("http")||url.includes("https"))
      return url;
      
    else if(url.includes("default"))
      return "https://yapp.live"+url;

    else if(url.includes("qiniu_admin/"))
      return "https://qiniu.yapp.live/admin/"+url.replace("qiniu_admin/", "");

    else if(url.includes("admin/"))
      return "https://qiniu.yapp.live/"+url;

    else if(url.includes("qiniu_"))
      return url.replace("qiniu_", "https://qiniu.yapp.live/");
      
    // else if(url.includes("http"))
    //   return url;
      

    return "https://qiniu.yapp.live/"+url;
  }


  // const getStickerImageUrl = (model) => {
  //   if(model==null)
  //     return "https://yapp.live/default_thumb.jpg";
  //   let url = model['gifticon'].toString();
  //   if(url==null||url=="")
  //     return "https://yapp.live/default_thumb.jpg";
  //   else if(url.includes("default"))
  //     return "https://yapp.live"+url;
  //   return url.replace("qiniu_", "https://qiniu.yapp.live/");
  // }

// module.exports.fetchApiToJson = fetchApiToJson;
// module.exports.runningThrowLoader = runningThrowLoader;
// module.exports.getString2Json = getString2Json;