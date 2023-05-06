
import Button from './Button'

export default function myfunc(props){

  return(
      <Button {...props} variant="primary" caption={(props.caption!=null)?props.caption:'พิมพ์'} iconLeft={'print'} />
  )
}

