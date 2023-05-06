
import Button from './Button'

export default function myfunc(props){
  return(
      <Button {...props} variant="outline-secondary" caption={(props.caption==null)?'แก้ไข':props.caption} iconLeft={'edit'} shape={'circle'} />
  )
}

