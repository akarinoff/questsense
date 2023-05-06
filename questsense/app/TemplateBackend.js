import React,{Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Router from 'next/router';
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { logout ,setMapKeyModalOpening,setOpenHamMenu} from '../my_redux/action'
import {fetchApiToJson,runningThrowLoader,getString2Json,fetchApiBlobToSaveFile} from '../utils/AppUtils'
import { LoadingDialog, DialogMessage, TextAka, ButtonSearch, Button ,FormModel} from '../components'
import { HeadTag } from '.'
import { Login } from '../app'

let myfunc = (props) => {
  const router = useRouter()
    
  const dispatch = useDispatch();
  const logon = useSelector((state) => state.logon)
  const mapKeyModalOpening = useSelector((state) => state.mapKeyModalOpening)
  const openHamMenu = useSelector((state) => state.openHamMenu)
  const loading = useSelector((state) => state.loading)
  const listRoute = useSelector((state) => state.listRoute)

  const errorByServerSideModel = useSelector((state) => state.errorByServerSideModel)
  
  let onClickMenu = (title,url) => {
    Router.push('/backend/'+url);
    dispatch(setOpenHamMenu(false));
  }

  let onOpenModalOpening = (key) => {
    let mapKeyModalOpening = {...mapKeyModalOpening ,[key]:"Y"};
    dispatch(setMapKeyModalOpening(mapKeyModalOpening));
  }

  let onCloseModalOpening =(key) => {
    let mapKeyModalOpening = {...mapKeyModalOpening ,[key]:null}
    dispatch(setMapKeyModalOpening(mapKeyModalOpening));
  }

  let myLogout = () => {
    runningThrowLoader(true ,dispatch, async ()=>{
      let fetchParam = {
        url : '/authen/logout',
        method : 'post',
        reduxStore : dispatch,
        isNot200ToThrow : true,
      }

      await fetchApiToJson(fetchParam);
      dispatch(logout());
    })
  }

  let listModalData = [
    // {key : 'UNIT' ,comp : <UnitMaster /> ,title : 'หน่วยนับ',size : 'lg' ,} ,
    // {key : 'USER' ,comp : <UserMaster /> ,title : 'ผู้ใช้เครื่องขายหน้าร้าน',size : 'xl' ,} ,
  ]

  let mapKeyToBoolean = {};
  for(let v=0;v<listModalData.length;v++){
    let model = listModalData[v];
    mapKeyToBoolean[model.key] = (typeof mapKeyModalOpening[model.key]!='undefined'&&mapKeyModalOpening[model.key]!=null);
  }

  let isHaveInRole = false;
  if(logon.user!=null){
    let listRouteUrl = listRoute.filter(model=>model.url==router.pathname&&model.roles.filter(role=>role==logon.user.ROLE_).length>0);
    if(listRouteUrl.length>0)
      isHaveInRole = true;
    else {
      for(let x=0;x<listRoute.length;x++){
        let menu = listRoute[x];
        let listRoutesub = menu.listRoutesub;
        if(typeof listRoutesub!='undefined')
          if(listRoutesub.filter(model=>model.url==router.pathname&&model.roles.filter(role=>role==logon.user.ROLE_).length>0).length>0){
            isHaveInRole = true;
            break;
          }
      }
    }
  }
  
  // {code:"HOME",descrip : "Home",icon:"",url:"/backend",is_dialog:"N",roles:["admin","po","account"] }

  return (
    <>
      <a id='myTop'></a>

      <LoadingDialog isShow={loading} />
      <DialogMessage />

      {logon.user == null &&
        <>
          <HeadTag />
          <Login/>
        </>
      }
      {logon.user != null &&
        <>
          <HeadTag />

          {listModalData.map((model,index)=>{
            if(mapKeyToBoolean[model.key])
              return(
                <FormModel key={index} title={model.title} size={model.size} isShow={true} onHide={()=>onCloseModalOpening(model.key)}>
                  {/* {model.comp} */}
                  {React.cloneElement(model.comp, { PROGRAM_CODE: model.key })}
                </FormModel>
              )
          })}

          <>
            <div className="headerMenu">
              
              {/* {JSON.stringify(logon.user)} */}

              <Navbar expand="lg">
                <Navbar.Brand href="/" className={"tagForMobile"}>
                  Yaplive
                </Navbar.Brand>
                {/* <Navbar.Brand href="/">
                  <img src="/static/imgs/logo devzii 2.png" style={{width:'25px'}} />
                </Navbar.Brand> */}
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    
                    {listRoute.map((group,groupIndex)=>{
                      let listRouteSub = group.listRoutesub;
                      if(group.roles.filter(model => model==logon.user.ROLE_).length>0&&group.isShowMenu)
                        return(
                          <Fragment key={groupIndex}>
                            {typeof listRouteSub=='undefined'&&
                              <Nav.Link href={"#"} onClick={()=>(group.url=="")?onOpenModalOpening(group.code):onClickMenu(".."+group.url,".."+group.url)}>
                                {group.icon!=null&&group.icon!=""&&
                                  <>
                                    <i className={'fa fa-'+group.icon} /> &nbsp;
                                  </>
                                }
                                {group.descrip}
                              </Nav.Link>
                            }

                            {typeof listRouteSub!='undefined'&&
                              <NavDropdown title={
                                <span>
                                  {group.icon!=null&&group.icon!=""&&
                                    <>
                                      <i className={'fa fa-'+group.icon} /> &nbsp;
                                    </>
                                  }
                                  {group.descrip}
                                </span>
                              }
                              >
                                {listRouteSub.map((menu,menuIndex)=>{
                                  // console.log(JSON.stringify(menu));
                                  if(menu.isShowMenu&&typeof menu!='undefined'&&menu.code=="DIVIDER")
                                    return(
                                      <Dropdown.Divider key={menuIndex} />
                                    )
                                  else if(menu.isShowMenu&&menu.roles.filter(model => model==logon.user.ROLE_).length>0)
                                    return(
                                      <Nav.Link key={menuIndex} href={"#"} onClick={()=>(menu.url=="")?onOpenModalOpening(menu.code):onClickMenu(".."+menu.url,".."+menu.url)}>
                                        <i className={'fa fa-angle-right'} /> {menu.descrip}
                                      </Nav.Link>
                                    )
                                })}
                              </NavDropdown>
                            }

                          </Fragment>
                        )
                    })}
                  </Nav>

                  <Form style={{color:'#FFF'}}>
                    <NavDropdown title={<>
                      <i className='fa fa-user' /> {logon.user.user_nicename} <i className='fa fa-angle-down' />
                    </>}>
                      {/* <NavDropdown.Item href={"#changepass"} onClick={()=>onClickMenu("เปลี่ยนรหัสผ่าน","changepass")}>
                        เปลี่ยนรหัสผ่าน
                      </NavDropdown.Item> */}
                      <NavDropdown.Item onClick={() => myLogout()}>ออกจากระบบ</NavDropdown.Item>
                    </NavDropdown>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
            </div>

            <div style={{minHeight:'100vh',padding:'1em',paddingTop:'1.5em',backgroundImage : "url('/static/imgs/Background.png')"}}>
              {!errorByServerSideModel.isErrorByServerSide&&
                <>
                  {isHaveInRole&&
                    <>
                      {props.children}
                    </>
                  }
                  {!isHaveInRole&&
                    <>
                      <h1 style={{color:'red',textAlign:"center",marginTop:'1em'}}>คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้</h1>
                    </>
                  }
                </>
              }
              {errorByServerSideModel.isErrorByServerSide&&
                <>
                  <Alert variant="danger">
                    <Alert.Heading>{errorByServerSideModel.errorServerSideMessage}</Alert.Heading>
                  </Alert>
                </>
              }
            </div>
          </>
        </>
      }
    </>
  )
}

export default myfunc;
