import React from 'react';
import FormControl from 'react-bootstrap/FormControl'

export default function myfunc({name,type="text",iconRight=null,value,onChange=null,onBlur=null,onKeyPress
  ,errMsg=null,errMsgByName=null,caption,style={},id=null,readOnly=false,disabled=false,placeholder="",size=null
  ,showLength=false,maxLength=null}){

  if(errMsgByName!=null&&typeof errMsgByName[name]!='undefined'&&errMsgByName[name]!=null&&errMsgByName[name]!='')
    errMsg = errMsgByName[name];

  let classNameText = '';
  if(errMsg!=null && errMsg!='')
    classNameText = 'aka-comp-error';

  return(
      <span>
        {caption!=null &&
          <div className="aka-comp-caption">
            {caption}
          </div>
        }

        <FormControl
          type={type} name={name} id={id} size={size}
          value={value} placeholder={placeholder} onKeyPress={onKeyPress}
          style={style} onBlur={onBlur} onChange={onChange} maxLength={maxLength}
          readOnly={readOnly} disabled={disabled} className={classNameText} />
        
        {showLength&&maxLength!=null&&
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-6" style={{fontSize:"11px",color:"green"}}>
              จำนวนข้อความ. {value==null?0:value.length}/{maxLength}
            </div>
            <div className="col-12 col-sm-6 col-lg-6" style={{textAlign:'right'}}>
              {(errMsg!=null && errMsg!='') &&
                <div className="aka-comp-msg-error">
                  {errMsg}
                </div>
              }
            </div>
          </div>
        }
        {!showLength&&
          <>
            {(errMsg!=null && errMsg!='') &&
              <div className="aka-comp-msg-error">
                {errMsg}
              </div>
            }
          </>
        }
      </span>
  )
}
