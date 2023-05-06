
import Button from './Button'

export default function myfunc(props){

  return(
      <Button {...props} variant="outline-secondary" caption={(props.caption!=null)?props.caption:'ค้นหา'} iconLeft={'search'} />
  )
}
