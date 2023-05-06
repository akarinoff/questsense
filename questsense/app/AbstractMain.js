import React from 'react';
import {showInfo} from '../my_redux/action'

class AbstractMain extends React.Component{

  constructor(props){
    super(props);
  }
  
  addToCartsSuper(product,propsStore){
    let carts = JSON.parse(JSON.stringify(propsStore.carts));
    let listSub = carts.listSub; // ถ้าไม่ใส่ [...] มันลงไปใน redux เลยวะ แสดงว่า array น่าจะใช้ได้ แต่เคยลอง {...} มันไม่ได้

    let isHave = false;
    for(let x=0;x<listSub.length;x++){
      let model = listSub[x];
      if(model.PRODUCT==product.id){
        model.qty++;
        model.total = model.price * model.qty;
        isHave = true;
        break;
      }
    }

    if(!isHave){
      let model = {};
      model['PRODUCT'] = product.id;
      model['productCode'] = product.code_;
      model['descrip'] = product.descrip;
      model['price'] = product.price;
      model['qty'] = 1;
      model['total'] = product.price_sell;
      listSub.push(model);
    }

    // propsStore.dispatch(setCarts(carts));
    propsStore.dispatch(showInfo("เรียบร้อย.","หยิปใส่ตะกร้าเรียบร้อย"))
  }
}

export default AbstractMain;
