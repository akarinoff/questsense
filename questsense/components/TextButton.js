import React from 'react';
import Textbox from'./Textbox'
import {Button} from'.'

export default function myfunc({name,value,onChange=null,disabledText=false,errMsg=null,hideButton=false,errMsgByName=null,onBlur=null
    ,isPassword,caption,style,readOnlyText=true,onClickPopup=null,isShowTextbox=true,captionButton=null,onPressEnter=null,onCancel=null}){
  return(
    <>
      {isShowTextbox&&
        <>
          <div style={{float:'left',width:'78%',paddingRight:'0.3em'}}>
            <Textbox name={name} value={value} onChange={onChange} onPressEnter ={onPressEnter} onBlur={onBlur}
              errMsg={errMsg} errMsgByName={errMsgByName}
              isPassword={isPassword} caption={caption} style={style} readOnly={readOnlyText} disabled={disabledText} />
          </div>
            
          {(onClickPopup!=null&&!hideButton) && 
            <>
              <div style={{float:'left',width:'35px'}}>
                {caption!=null&&caption!=""&&
                  <div>
                    &nbsp;
                  </div>
                }
                <Button variant="primary" iconLeft={'search'} onClick={onClickPopup} />
              </div>
              {onCancel!=null&&
                <div style={{float:'left',width:'35px'}}>
                  {caption!=null&&caption!=""&&
                    <div>
                      &nbsp;
                    </div>
                  }
                  <Button variant="danger" iconLeft={'close'} onClick={onCancel} />
                </div>
              }
            </>
          }
        </>
      }
      {!isShowTextbox&&
        <Button typeAntd="primary" iconLeft={'bars'} shape={(captionButton==null)?"circle":null} caption={captionButton} onClick={onClickPopup} />
      }
    </>
  )
}
