import React from 'react';
import {getETPTextReplace} from '../utils/AppUtils'
import Form from 'react-bootstrap/Form'

export default function myfunc({name,id,onChange=null,errMsg,errMsgByName=null,caption,style={},value,rows=3,cols=30
  ,readOnly=false,showLength=false,maxLength=null}){
    
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
        
        <Form.Control as="textarea" name={name} id={id} size="sm"
          value={value} rows={rows}
          style={style}  onChange={onChange} maxLength={maxLength}
          readOnly={readOnly} className={classNameText} />
        
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
