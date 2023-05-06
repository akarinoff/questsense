import React from 'react';
import Form from 'react-bootstrap/Form'

let listDate = [];
for(let x=0;x<24;x++){
  let str = (x.toString().length==1)?"0"+x:x+"";
  for(let v=0;v<60;v+=15){
    let str2 = (v.toString().length==1)?"0"+v:v+"";
    listDate.push(str+":"+str2);
  }
}

export default function myfunc({name,children,iconLeft=null,iconRight=null,value,onChange=null
  ,errMsg=null,errMsgByName=null,caption,style={},id=null,readOnly=false,disabled=false}){

  if(errMsgByName!=null&&typeof errMsgByName[name]!='undefined'&&errMsgByName[name]!=null&&errMsgByName[name]!='')
    errMsg = errMsgByName[name];

  let classNameText = '';
  if(errMsg!=null && errMsg!='')
    classNameText = 'aka-comp-error';

  let className = "aka-comp-container"
  if(iconLeft!=null)
    className+=" aka-comp-container-iconleft";
  if(iconRight!=null)
    className+=" aka-comp-container-iconright";

  return(
      <span>
        {caption!=null &&
          <div className="aka-comp-caption">
            {caption}
          </div>
        }

        <div className={className}>
          <Form.Control as="select" size="sm" name={name} className={classNameText} value={value} id={id}
            onChange={onChange} style={style} readOnly={readOnly} disabled={disabled}>
            {listDate.map((model)=>{
              return(
                <option key={model} value={model}>{model}</option>
              )
            })}
          </Form.Control>
        </div>
        
        {(errMsg!=null && errMsg!='') &&
          <div className="aka-comp-msg-error">
            {errMsg}
          </div>
        }
      </span>
  )
}
