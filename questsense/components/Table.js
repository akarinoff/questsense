import React,{useState,useEffect} from 'react';
import { Table, Tbody } from 'react-super-responsive-table'

// export default function MyTable(props){
//     const [listData,setListData] = useState([]);
//     const [listPageSize,setListPageSize] = useState([]);
//     const [pageSizeSelected,setPageSizeSelected] = useState(1);
//     const [pageSizeInt,setPageSizeInt] = useState(0);
    

//     useEffect(()=>{
//         // if(JSON.stringify(nextProps.listData)!=JSON.stringify(this.props.listData)){
//         //     await this.refreshPage(nextProps);
//         //     return true; // true = re render
//         // }
//         console.log("FFFF");
//         refreshPage();
//     },[props.listData]);

//     let refreshPage = async () => {
//         let {isPaging=true} = props;

//         if(props.listData.length>0&&isPaging){
//             let pageSizeInt = props.listData.length / props.limitrow;
//             pageSizeInt = Math.ceil(pageSizeInt);
    
//             let listPageSize = [];
//             for(let x=1;x<=pageSizeInt;x++){
//                 listPageSize.push(x);
//             }
    
//             setPageSizeSelected(1);
//             setPageSizeInt(pageSizeInt);
//             setListPageSize(listPageSize);
    
//             await refreshListByPage();
//         }else{
//             setPageSizeSelected(1);
//             setPageSizeInt(1);
//             setListPageSize([]);
//             setListData(listData);
//         }
//     }

//     let refreshListByPage = async () => {
//         // alert(pageSizeSelected);
//         let listDataUse = [];
//         let listData = props.listData;
//         let limitrow = props.limitrow;

//         let rowStart = (pageSizeSelected * limitrow) - limitrow;
//         let rowEnd = (pageSizeSelected * limitrow);
//         if(pageSizeSelected==pageSizeInt)
//             rowEnd = listData.length;

//         for(let x=rowStart;x<rowEnd;x++){
//             let model = listData[x];
//             model['rowIndex'] = x;
//             listDataUse.push(model);
//         }
//         // alert(listDataUse.length);

//         setListData(listDataUse);
//     }

//     let onChangePage = (pageSizeSelectedP) => {
//         setPageSizeInt(pageSizeSelectedP);
//         refreshListByPage();
//     }

//     let getNavigator = (listPageSize ,pageSizeSelected) => {
//         return(
//             <div className="off-paging">
//                 หน้าที่ : &nbsp;
//                 {listPageSize.map(model=>(
//                     <span key={model}>
//                         {model!=1&&
//                             <>
//                                 /
//                             </>
//                         }

//                         {pageSizeSelected!=model&&
//                             <a onClick={()=>onChangePage(model)}
//                                 style={{}}>
//                                 {model}
//                             </a>
//                         }
//                         {pageSizeSelected==model&&
//                             <span className="active">
//                                 {model}
//                             </span>
//                         }
//                     </span>
//                 ))}
//             </div>
//         )
//     }

    
//     let { header, bodyFunc ,style= {},styleContainer={},styleTable,tableStriped=true,idTable=null} = props;

//     let className = "table table-hover table-bordered";
//     if(tableStriped)
//         className+=" table-striped";

//     return (
//         <div className="off-table" style={styleContainer}>
//             {listPageSize.length>0&&
//                 <>
//                     {getNavigator(listPageSize,pageSizeSelected)}
//                 </>
//             }
            
//             <Table id={idTable} border="1" className={className} style={styleTable}>
//                 {header}

//                 <Tbody>
//                     {listData.map((model, index) => {
//                         return (
//                             bodyFunc(model, index)
//                         )
//                     })}
//                 </Tbody>
//             </Table>
            
//             {listPageSize.length>0&&
//                 <>
//                     {getNavigator(listPageSize,pageSizeSelected)}
//                 </>
//             }
//         </div>
//     )
// }


// export default function MyTable(props) {
    
//     let { header, bodyFunc,style= {},styleContainer={},styleTable,tableStriped=false,idTable=null,isHtmlTable=false} = props;
    
//     const [listData ,setListData] = useState([]);
//     const [listPageSize ,setListPageSize] = useState([]);
//     const [pageSizeSelected ,setPageSizeSelected] = useState(1);
//     const [lengthFull ,setLengthFull] = useState();
//     const [pageSizeInt ,setPageSizeInt] = useState();

//     useEffect(()=>{
//         console.log("useEffect props.listData");
//         setListData(props.listData);
//         refreshPage();
//     },[props.listData]); // <-  [] เพื่อบอก React ว่า effect นี้ไม่ได้ขึ้นอยู่กับ props หรือ state ใดๆ เพื่อให้ไม่ต้อง re-run อีก

//     // useEffect(()=>{
//     //     console.log("useEffect refreshListByPage");
//     //     refreshListByPage();
//     // },[pageSizeSelected ,pageSizeInt ,listPageSize ,lengthFull]);


//     // componentDidMount(){
//     //     this.refreshPage(this.props);
//     // }

//     // async shouldComponentUpdate(nextProps){
//     //     if(JSON.stringify(nextProps.listData)!=JSON.stringify(this.props.listData)){
//     //         await this.refreshPage(nextProps);
//     //         // return true; // true = re render
//     //     }
//     // }

//     let refreshPage = () => {
//         let lengthFull = listData.length;

//         if(props.listData.length>0&&props.isPaging){
//             let pageSizeInt = props.listData.length / props.limitrow;
//             pageSizeInt = Math.ceil(pageSizeInt);
    
//             let listPageSize = [];
//             for(let x=1;x<=pageSizeInt;x++){
//                 listPageSize.push(x);
//             }
    
//             setPageSizeSelected(pageSizeSelected);
//             setPageSizeInt(pageSizeInt);
//             setListPageSize(listPageSize);
//             setLengthFull(lengthFull);
//         }else{
//             setPageSizeSelected(1);
//             setPageSizeInt(1);
//             setListPageSize([]);
//             setLengthFull(lengthFull);
//         }
//     }

//     let refreshListByPage = async()=>{
//         let listDataUse = [];
//         let listData = props.listData;
//         let pageSizeInt = pageSizeInt;
//         let pageSizeSelected = pageSizeSelected;
//         let limitrow = props.limitrow;

//         let rowStart = (pageSizeSelected * limitrow) - limitrow;
//         let rowEnd = (pageSizeSelected * limitrow);
//         if(pageSizeSelected==pageSizeInt)
//             rowEnd = listData.length;

//         for(let x=rowStart;x<rowEnd;x++){
//             let model = listData[x];
//             model['rowIndex'] = x;
//             listDataUse.push(model);
//         }

//         setListData(listDataUse);
//     }

//     let onChangePage = async(pageSizeSelected) => {
//         setPageSizeSelected(pageSizeSelected);

//         // await this.setState({pageSizeSelected:pageSizeSelected});
//         // this.refreshListByPage();
//     }

//     let getNavigator = (listPageSize,pageSizeSelected)=>{
//         return(
//             <div className="off-paging">
//                 หน้าที่ : &nbsp;
//                 {listPageSize.map(model=>(
//                     <span key={model}>
//                         {model!=1&&
//                             <>
//                                 /
//                             </>
//                         }

//                         {pageSizeSelected!=model&&
//                             <a onClick={()=>onChangePage(model)}
//                                 style={{}}>
//                                 {model}
//                             </a>
//                         }
//                         {pageSizeSelected==model&&
//                             <span className="active">
//                                 {model}
//                             </span>
//                         }
//                     </span>
//                 ))}
//             </div>
//         )
//     }


//     let className = "table table-bordered"; //  table-hover
//     if(tableStriped)
//         className+=" table-striped";

//     return (
//         <div className="off-table" style={styleContainer}>
//             {listPageSize.length>0&&
//                 <>
//                     {getNavigator(listPageSize,pageSizeSelected)}
//                 </>
//             }
            
//             {!isHtmlTable&&
//                 <Table id={idTable} border="1" className={className} style={styleTable}>
//                     {/* {header} */}

//                     <Tbody>
//                         {listData.map((model, index) => {
//                             return (
//                                 bodyFunc(model, index)
//                             )
//                         })}
//                     </Tbody>
//                 </Table>
//             }
            
//             {isHtmlTable&&
//                 <table id={idTable} border="1" className={className} style={styleTable}>
//                     {header}

//                     <tbody>
//                         {listData.map((model, index) => {
//                             return (
//                                 bodyFunc(model, index)
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             }
            
//             {listPageSize.length>0&&
//                 <>
//                     {getNavigator(listPageSize,pageSizeSelected)}
//                 </>
//             }

//             <div>ข้อมูลทั้งหมด : {lengthFull} แถว</div>

//         </div>
//     )
//   }

export default class MyClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listData : [],
            listPageSize : [],
            lengthFull : 0,
            pageSizeSelected : 1,
            pageSizeInt : 0,
        };
    }

    componentDidMount(){
        this.refreshPage(this.props);
    }

    async shouldComponentUpdate(nextProps){
        if(JSON.stringify(nextProps.listData)!=JSON.stringify(this.props.listData)){
            await this.refreshPage(nextProps);
            // return true; // true = re render
        }
    }

    async refreshPage(props){
        let {isPaging=true ,listData} = props;
        let lengthFull = listData.length;

        if(listData.length>0&&isPaging){
            let pageSizeInt = listData.length / this.props.limitrow;
            pageSizeInt = Math.ceil(pageSizeInt);
    
            let listPageSize = [];
            for(let x=1;x<=pageSizeInt;x++){
                listPageSize.push(x);
            }
    
            await this.setState({pageSizeSelected:1,pageSizeInt:pageSizeInt,listPageSize:listPageSize,lengthFull});
    
            await this.refreshListByPage();
        }else{
            await this.setState({pageSizeSelected:1,pageSizeInt:1,listPageSize:[],listData:listData,lengthFull});
        }
    }

    async refreshListByPage(){
        let listDataUse = [];
        let listData = this.props.listData;
        let pageSizeInt = this.state.pageSizeInt;
        let pageSizeSelected = this.state.pageSizeSelected;
        let limitrow = this.props.limitrow;

        let rowStart = (pageSizeSelected * limitrow) - limitrow;
        let rowEnd = (pageSizeSelected * limitrow);
        if(pageSizeSelected==pageSizeInt)
            rowEnd = listData.length;

        for(let x=rowStart;x<rowEnd;x++){
            let model = listData[x];
            model['rowIndex'] = x;
            listDataUse.push(model);
        }

        await this.setState({listData:listDataUse});
    }

    async onChangePage(pageSizeSelected){
        await this.setState({pageSizeSelected:pageSizeSelected});
        this.refreshListByPage();
    }

    getNavigator(listPageSize,pageSizeSelected){
        // let maxShowPage = 5;
        // if(parseInt(pageSizeSelected)>5)
        //     alert("");

        // let listPageSizeForShow = [];

        // let maxShowPage = 5;
        // let leftHave = 0;
        // let rightHave = 0;
        // for(let x=listPageSize.length-1;x>0;x--){
        //     leftHave++;
        //     if(leftHave==maxShowPage)
        //         break;
        // }
        // for(let x=0-1;x>0;x--){
        //     rightHave++;
        //     if(rightHave==maxShowPage)
        //         break;
        // }


        return(
            <div className="off-paging">
                หน้าที่ : &nbsp;
                {listPageSize.map(model=>(
                    <span key={model}>
                        {model!=1&&
                            <>
                                /
                            </>
                        }

                        {pageSizeSelected!=model&&
                            <a onClick={()=>this.onChangePage(model)}
                                style={{}}>
                                {model}
                            </a>
                        }
                        {pageSizeSelected==model&&
                            <span className="active">
                                {model}
                            </span>
                        }
                    </span>
                ))}
            </div>
        )
    }

    render() {
        let { header, bodyFunc,style= {},styleContainer={},styleTable,tableStriped=false,idTable=null,isHtmlTable=false} = this.props;
        let {listData ,listPageSize ,pageSizeSelected,lengthFull} = this.state;

        let className = "table table-bordered"; //  table-hover
        if(tableStriped)
            className+=" table-striped";

        return (
            <div className="off-table" style={styleContainer}>
                {listPageSize.length>0&&
                    <>
                        {this.getNavigator(listPageSize,pageSizeSelected)}
                    </>
                }
                
                {!isHtmlTable&&
                    <Table id={idTable} border="1" className={className} style={styleTable}>
                        {header}

                        <Tbody>
                            {listData.map((model, index) => {
                                return (
                                    bodyFunc(model, index)
                                )
                            })}
                        </Tbody>
                    </Table>
                }
                
                {isHtmlTable&&
                    <table id={idTable} border="1" className={className} style={styleTable}>
                        {header}

                        <tbody>
                            {listData.map((model, index) => {
                                return (
                                    bodyFunc(model, index)
                                )
                            })}
                        </tbody>
                    </table>
                }
                
                {listPageSize.length>0&&
                    <>
                        {this.getNavigator(listPageSize,pageSizeSelected)}
                    </>
                }

                <div>ข้อมูลทั้งหมด : {lengthFull} แถว</div>

            </div>
        )
    }
}
