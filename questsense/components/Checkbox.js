import React from 'react';

export default function myfunc({id=null,name,value,checked=false,style={},caption=null,onChange=null,disabled=false,readOnly=false}){
  id = (id!=null)?id:name;
  return(
      <>
        <label className="aka-label-checkbox">
          <input type='checkbox' id={id} name={name} value={value} disabled={disabled} style={style} readOnly={readOnly}
            onChange={onChange} checked={checked}
            /> {caption}
        </label>
      </>
  )
}
