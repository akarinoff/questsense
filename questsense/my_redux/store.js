import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import Cookies from 'js-cookie';
import { cookieToken} from '../config/config';

let store;

 let listRoute = [

  {code:"",descrip : "",icon:"",url:"/",roles:["admin","agency","user"] ,isShowMenu:false}
  ,{code:"",descrip : "",icon:"",url:"/index",roles:["admin","agency","user"] ,isShowMenu:false}
  
  // ,{code:"",descrip : "",icon:"",url:"/newfrontend",roles:[] ,isShowMenu:false}
  

  ,{code:"HOME",descrip : "Home",icon:"home",url:"/backend",roles:["admin","agency","user"] ,isShowMenu:true}

  ,{code:"PAYMENTMASTER",descrip : "payment master",icon:"users",url:"/backend/paymentmaster",roles:["admin"] ,isShowMenu:true}

  ,{code:"AGENCY_ADMIN",descrip : "agency",icon:"users",url:"/backend/agency",roles:["admin"] ,isShowMenu:true}
  
  ,{code:"TRANSFER_COIN",descrip : "Transfer coin",icon:"exchange",url:"/backend/transfercoin",roles:["agency"] ,isShowMenu:true}
  
  ,{code:"USER_BY_AGENCY",descrip : "Users",icon:"users",url:"/backend/userbyagency",roles:["agency"] ,isShowMenu:true}
  
  ,{
    code:"",descrip : "Contract" ,icon:"file-text" ,roles:["admin"] ,isShowMenu:true
    ,listRoutesub : [
      {code:"CONTRACTTYPE",descrip : "Contracttype",icon:"",url:"/backend/contracttype",roles:["admin"] ,isShowMenu:true}
      ,{code:"USERCONTRACTTYPE",descrip : "User contract",icon:"",url:"/backend/usercontracttype",roles:["admin"] ,isShowMenu:true}
    ]
  }
  
  ,{
    code:"",descrip : "Report" ,icon:"bar-chart" ,roles:["admin","agency"] ,isShowMenu:true
    ,listRoutesub : [
      {code:"REPORT_TRANS",descrip : "Transaction",icon:"",url:"/backend/report",roles:["admin","agency"] ,isShowMenu:true}
      ,{code:"REPORT_GROUPING",descrip : "Grouping",icon:"",url:"/backend/reportgrouping",roles:["admin","agency"] ,isShowMenu:true}
      
      ,{code:"REPORT_TRANSFER",descrip : "Transfer coin",icon:"",url:"/backend/reporttransfercoin",roles:["admin","agency"] ,isShowMenu:true}
      ,{code:"RECEIVE_GIFT",descrip : "Receive Gift",icon:"",url:"/backend/coinrecord",roles:["admin"] ,isShowMenu:true}
    ]
  }
  
  ,{
    code:"",descrip : "Setting" ,icon:"cogs" ,roles:["admin"] ,isShowMenu:true
    ,listRoutesub : [
      {code:"ADMINS",descrip : "Admins",icon:"",url:"/backend/admins",roles:["admin"] ,isShowMenu:true}
    ]
  }

  

  // ,{code:"PROJECT",descrip : "Project",icon:"folder",url:"/backend/project",roles:["admin"] ,isShowMenu:true}
  
  // ,{code:"PROJECTDATA",descrip : "Project Data",icon:"folder-open",url:"/backend/projectdata",roles:["admin"] ,isShowMenu:true}

  // ,{code:"USERS",descrip : "users",icon:"users",url:"/backend/users",roles:["admin"] ,isShowMenu:true}

  // ,{code:"UNIT",descrip : "unit",icon:"",url:"/backend/unit",roles:["admin"] ,isShowMenu:true}

  // ,{
  //   code:"",descrip : "สินค้า" ,icon:"" ,roles:["admin"] ,isShowMenu:true
  //   ,listRoutesub : [
  //     {code:"PRODUCTGROUP",descrip : "ประเภทสินค้า",icon:"",url:"",roles:["admin"] ,isShowMenu:true}
  //     ,{code:"UNIT",descrip : "หน่วยนับ",icon:"",url:"",roles:["admin"] ,isShowMenu:true}
  //     ,{code:"LOCATION",descrip : "สถานที่เก็บสินค้า",icon:"",url:"",roles:["admin"] ,isShowMenu:true}
  //     ,{code:"PRODUCT",descrip : "สินค้า",icon:"",url:"",roles:["admin"] ,isShowMenu:true}
  //   ]
  // }
];

const initialState = {
  logon : {
    user:null,
    userJsonText:null,
    token:null,
  },

  listRoute : listRoute,

  mapKeyModalOpening : {},

  loading:false,

  dlgMessage :{
    isShow:false,
    isException:false,
    status:'info',
    title:'',
    detail:'',
  },

  dlgFrontMini:{
    isShow:false,
    mode:'',
    model:{},
    listModel:[],
  },

  intialData : {
    listClass : [],
    listUserleftbar : [],
    userLogonData : {},
  },

  isShowLoginForm : false,

  isLogoutNow : false,

  errorByServerSideModel : {
    isErrorByServerSide : false,
    errorServerSideMessage : "",
  },

  profileUserModel : {
    user : {},
    isShow : false,
  },

}

const reducer = (state = initialState, action) => {
  // switch (action.type) {
  //   case "loading":
  //     return {
  //       ...state,
  //       "loading": action.value,
  //     }
  //   case "dlgMessage":
  //     return {
  //       ...state,
  //       "dlgMessage": action.value,
  //     }
  //   case "logon":

  //     Cookies.set(cookieToken ,action.value.token);
  //     if(action.value.token==null)
  //       Cookies.remove(cookieToken);

  //     return {
  //       ...state,
  //       "logon": action.value,
  //     }
  //   default:
  //     return state
  // }
  
  if(typeof action.type !== 'undefined'&&typeof state[action.type] !== 'undefined'){
    if(action.type=='logon'){
      // console.log("set cookie = "+action.value.token)
      // จริงๆ cookies ต้องใส่ await
        Cookies.set(cookieToken ,action.value.token);
        // Cookies.set(cookieUserJson ,action.value.userJsonText);
        if(action.value.token==null){
          Cookies.remove(cookieToken);
          // Cookies.remove(cookieUserJson);
        }
    }
    // return {
    //   ...state,
    //   [action.type] : action.value,
    // }
    return Object.assign({}, state, { [action.type] : action.value })
  }else
    return state
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  // console.log("preloadedState = "+preloadedState);
  let _store = store ?? initStore(preloadedState)
  // console.log("_store = "+_store);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
