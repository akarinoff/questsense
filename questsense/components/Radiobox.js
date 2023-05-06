import React from 'react';

export default function myfunc({name,id=null,value,checked,style={},caption=null,onChange=null}){
  id = (id!=null)?id:name;
  id = id+"_"+value;
  return(
    <label className="aka-label-radiobox">
      <input type='radio' id={id} name={name} value={value} checked={checked} onChange={onChange} style={style} />
      &nbsp;{caption}
    </label>
  )
}
