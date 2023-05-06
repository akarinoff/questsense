import React from 'react';
import DatePicker from "react-datepicker";

export default function myfunc({name,type="text",iconRight=null,value,onChange=null,onBlur=null,onKeyPress
  ,errMsg=null,errMsgByName=null,caption,style={},id=null,readOnly=false,disabled=false,placeholder=""
  ,showLength=false,maxLength=null,timeIntervals=15}){

  if(errMsgByName!=null&&typeof errMsgByName[name]!='undefined'&&errMsgByName[name]!=null&&errMsgByName[name]!='')
    errMsg = errMsgByName[name];

  let classNameText = '';
  if(errMsg!=null && errMsg!='')
    classNameText = 'aka-comp-error';

  let dateFormat = "dd/MM/yyyy";

  return(
      <span>
        {caption!=null &&
          <div className="aka-comp-caption">
            {caption}
          </div>
        }

        <DatePicker
          name={name} id={id} size="sm"
          placeholder={placeholder}
          selected={value||null}
          onChange={onChange}
          readOnly={readOnly} disabled={disabled} className={"form-control"}
          
          // selected={startDate}
          // onChange={date => setStartDate(date)}
          
          
          showTimeSelect
          // showTimeSelectOnly
          timeCaption="Time"
          timeIntervals={timeIntervals}
          dateFormat="dd/MM/yyyy HH:mm"
          timeFormat="HH:mm" 
          />
        
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
