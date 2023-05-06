
import Button from './Button'

export default function myfunc(props){

  return(
      <Button {...props} variant="danger" caption={(props.caption==null)?'ลบ':props.caption} iconLeft={'trash'} shape={'circle'} />
  )
}
