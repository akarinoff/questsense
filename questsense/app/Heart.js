
export default function Myfunc({color ,style={}}){

  return(
    <>
      {/* <div>sss</div> */}
      <div className="animateHeart" style={style}>
        <i className="fa fa-heart" style={{color:color,fontSize:"30px"}}></i>
      </div>
    </>
  )
}

