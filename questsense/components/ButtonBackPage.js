
import Button from './Button'

export default function myfunc(props){
  let {variant="outline-secondary" ,style={}} = props;
  style['paddingTop'] = '0em';
  style['paddingBottom'] = '0em';
  return(
      <Button {...props} variant={variant} style={style} caption={(props.caption==null)?'':props.caption} iconLeft={'step-backward'} />
  )
}

