
import Button from './Button'

export default function myfunc(props){
  let {shape='circle'} = props;
  return(
      <Button {...props} 
        variant="outline-secondary" 
        caption={(props.caption==null)?'เพิ่มรายการ':props.caption} iconLeft={'plus'} shape={shape} />
  )
}
