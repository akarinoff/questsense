import { useEffect } from "react";
import { useSelector ,useDispatch} from 'react-redux'
import {logout} from '../my_redux/action'

export default function Myfunc(){
  const dispatch = useDispatch();
  const logon = useSelector((state) => state.logon);

  useEffect(() => {
    if(logon.user==null)
      dispatch(logout());
  }, []); // <-  [] เพื่อบอก React ว่า effect นี้ไม่ได้ขึ้นอยู่กับ props หรือ state ใดๆ เพื่อให้ไม่ต้อง re-run อีก
  
  return(
    <></>
  )
}

