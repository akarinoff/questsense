import React from 'react';
import Form from 'react-bootstrap/Form'

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
          {iconLeft!=null&&
            <div className="aka-comp-icon">
              <i className={'fa fa-'+iconLeft}></i>
            </div>
          }
        
          <Form.Control as="select" size="sm" name={name} className={classNameText} value={value} id={id}
            onChange={onChange} style={style} readOnly={readOnly} disabled={disabled}>
            {children}
          </Form.Control>
            
          {iconRight!=null&&
            <div className="aka-comp-icon">
              <i className={'fa fa-'+iconRight}></i>
            </div>
          }
        </div>
        
        {(errMsg!=null && errMsg!='') &&
          <div className="aka-comp-msg-error">
            {errMsg}
          </div>
        }
      </span>
  )
}
