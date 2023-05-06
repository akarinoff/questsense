
import Button from './Button'

export default function myfunc(props){

  return(
      <Button {...props} variant="success" caption={(props.caption!=null)?props.caption:'บันทึก'} iconLeft={'save'} />
  )
}
