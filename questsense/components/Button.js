import Button from 'react-bootstrap/Button'

export default function myfunc({onClick=null,disabled=false,variant=null,name=null,type='button',style={},caption=null,iconLeft=null,iconRight,size="sm"}){
    if(variant==null)
        variant = "primary";
        
    return(
        <Button disabled={disabled} size={size} type={type} variant={variant} onClick={onClick} style={style} name={name}>
            {iconLeft!=null&&
                <>
                    <i className={"fa fa-"+iconLeft} />
                    {(caption!=null&&caption!='') &&
                        <>&nbsp;</>
                    }
                </>
            }

            {(caption!=null&&caption!='') &&
                <>{caption}</>
            }
            
            {iconRight!=null&&
                <>
                    {(caption!=null&&caption!='') &&
                        <>&nbsp;</>
                    }
                    <i className={"fa fa-"+iconRight} />
                </>
            }
        </Button>
    )
  }
  