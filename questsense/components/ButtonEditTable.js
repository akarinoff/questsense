
import Button from './Button'

export default function myfunc(props){
  return(
      <Button {...props} variant="default" caption={"แก้ไข"} 
        style={{padding:'0.2em',paddingLeft:'0.3em',paddingRight:'0.3em',fontSize:'12px'}}
        iconLeft={'edit'} shape={'circle'} />
  )
}

