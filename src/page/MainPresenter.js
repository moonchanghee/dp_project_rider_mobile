import React , {useState}from 'react';
import { Layout, List,Button, Card , Table ,Tabs,Divider, message } from 'antd';
import Cookie from 'js-cookie';
import Item from './Item'
import produce from 'immer';
import Axios from 'axios';
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

let arr = []
let arr1= []
let arr2 = []
const key = 'updatable';
const MainPresenter = ({states,callbacks}) => {
  console.log(states.loginData.data)
  const [matchRider, setMatchRider] = useState(false);
  const [datass, setData] = useState([{
    name :"가게명", address:"주소" , menu:"메뉴" 
  }]);
let data = [ 
  {name : "금월 배달 횟수" , val : states.loginData.data.deliverer_monthCnt },
  {name : "누적 배달 횟수"   ,val : states.loginData.data.deliverer_totalCnt},
  {name : "등급"   ,val : states.loginData.data.grade_nm},
  {name : "점수"   ,val : states.loginData.data.deliverer_score},
  {name : "금월 벌점 부여 횟수"   ,val : states.loginData.data.caution_monthCnt},
  {name : "누적 벌점 부여 횟수"   ,val : states.loginData.data.caution_totalCnt},

]
let count = 0
let data1 = [
  {MonTotal : states.loginData.data.deliverer_monthPrice , All: states.loginData.data.deliverer_totalPrice }
]

const columns = [
  {
    title: '금월 배달 총액',
    dataIndex: 'MonTotal',
    width: 150,
  },
  {
    title: '누적 배달 총액',
    dataIndex: 'All',
    width: 150,
  },
];
const sendData = function(e){
  states.webSocket.send(e)
}

const order = () => {
  arr= []
  sendData(`${states.session},  ${arr1[4]}`)
  message.loading({ content: '수락대기중..', key });
  setMatchRider(false)

}
function callback(key) {
  console.log(key);
}

const reject = () => {
  arr= []
  arr1= []
  console.log("거절")
  setMatchRider(false)
}
const test = () => {
  alert("업무가 시작되었습니다.")
  sendData(`${states.session}`)

}

states.webSocket.onopen = () => {
  console.log("오픈")
};

const add = (name, address , menu , ordernum) => {
  let newData = produce(datass, (draft) => {
    draft.push({ name:name , address: address , menu:menu , ordernum: ordernum });
  });
  setData(newData);
};

const deleteItem = (ordernum) => {
  let index = datass.findIndex((e) => e.ordernum === ordernum);
  let newData = produce(datass, (draft) => {
    draft.splice(index, 1);
  });
  setData(newData);
};


states.webSocket.onmessage = function (event) {
  console.log(event)
if(event.data != "true"){
  arr.push(event.data)
  arr1.push(event.data)
}
  
  if (event.data === "true") {


  ++count 
  console.log(arr1[4])
  setTimeout(() => {
    message.success({
      content: '매칭완료',
      key,
      duration: 3,
    });
    add(arr1[0], arr1[1] , arr1[3] , arr1[4]) 
    arr1 = []
  });

    }


   if(arr.length === 4)
   {
    setMatchRider(true);
  }

};



    return (
    
    <Tabs defaultActiveKey="1" onChange={callback}>

    <TabPane tab="결산" key="1">
  <div
    style={{

      height: '500px',
      marginLeft:"50px",
      marginRight : "50px"
    }}
  >
    <List
      style={{
        backgroundColor : "#ffffff",
        textAlign: 'center',
        margin: 'auto',
      }}
      size="small"
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <h1>{item.name}</h1>
          <p>{item.val}</p>
          
        </List.Item>
      )}
    />
    <Table
    style ={{marginTop : "10%"}}
    columns={columns}
    dataSource={data1}
    pagination= {false}
  />
  </div>

    </TabPane>
    <TabPane tab="업무" key="2">
    <Layout
        className="layout"
          >
    <Content style={{ }}>
    <List
    style={{
      
      textAlign: 'center',
      width: '500px',
      marginLeft:"25px"
    }}
    size="small"
    bordered
    dataSource={datass.map((e) => e)}
    renderItem={(item , value) => (
      <List.Item bordered>
      
        <h1>{item.name}</h1>
        <p>{item.address}</p>
        <p>{item.menu}</p>

        {value ? <div style ={{marginBottom:"15px"}}>
          <button onClick = { () =>{
            Axios.post("http://192.168.64.94:8080/v1/company/order/startmatch" , {order_seq : item.ordernum} ,
            {
              headers: {
                Authorization: states.session, 
                'Content-Type': 'application/json;charset=UTF-8',
              }}
            ).then((e) => console.log(e))
            console.log("시작")
            console.log(item.ordernum)
            alert("배달이 시작되었습니다")
          }
          }>시작</button>
          <button 
          style={{marginLeft:"3px"}}
          onClick = { () =>{
            Axios.post("http://192.168.64.94:8080/v1/company/order/endmatch" , {order_seq : item.ordernum}
            ).then((e) => console.log(e))
            console.log(item.ordernum)
            alert("배달이 완료되었습니다")
            deleteItem(item.ordernum)
          }
          }>완료</button>
          </div> 
        :<div><p></p></div>}
  
        
        </List.Item>
    )}
  />
{matchRider ? (
  <div style={{  visibility: 'visible'  , marginTop:"10%" ,border: 'solid', backgroundColor : "#ffffff"}}>
    <div style={{marginLeft : "35%"}}>
    <h1>가게정보</h1>
    <p>{arr[0]}</p>
    <p>{arr[1]}</p>
    <h1>주문정보</h1>
    <p>{arr[3]}</p>
    <Button onClick={reject}>거절</Button>
    <Button onClick={order}>수락</Button>
  </div>
  </div>
) : ""}
<Button
style ={{marginLeft:"25px"}}
 onClick = {test} 
>업무시작</Button>
    </Content>
      </Layout>
    </TabPane>
  </Tabs>
);
};

export default MainPresenter;