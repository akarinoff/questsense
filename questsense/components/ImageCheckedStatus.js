import React from 'react';

export default function myfunc({checked=false,style,caption=null}){
  if(style==null)
    style={};

  if(checked)
    style['color'] = '#19A98B';
  else
    style['color'] = '#B94A48';

  return(
    <span>
      {checked &&
        <i className='fa fa-check' style={style} />
      }
      {!checked &&
        <i className='fa fa-close' style={style} />
      }
      {caption!=null&&caption!=''&&
        <>
          &nbsp;{caption}
        </>
      }
    </span>
  )
}
