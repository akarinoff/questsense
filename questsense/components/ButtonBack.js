
import Button from './Button'

export default function myfunc(props){

  return(
      <Button {...props} variant="default" caption={(props.caption==null)?'กลับ':props.caption} iconLeft={'step-backward'} />
  )
}

