import React from 'react';
import Textbox from './Textbox'

export default function myfunc(props){
  return(
      <Textbox {...props} type='number' style={{textAlign:'right'}} />
  )
}
