import React,{useEffect,useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './Chart'
import firebase from 'firebase';

function App() {
  const serviceAccount =  {
    apiKey: "AIzaSyDo2rvNuUqgoFYHp3XzmIh_RLK8jLoiq7Q",
    authDomain: "energie-fitness-tracker.firebaseapp.com",
    projectId: "energie-fitness-tracker",
    storageBucket: "energie-fitness-tracker.appspot.com",
    messagingSenderId: "1011872736963",
    appId: "1:1011872736963:web:4f1dad90946ccdc5022476"
  };
  //JSON.parse(process.env.serviceAccount) || require('./service.json');
  if (!firebase.apps.length) {
    firebase.initializeApp(serviceAccount);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  const [db,setDb] = useState(null)
  const [data,setData] = useState(null)
  useEffect(()=>{
    if(!db){
      setDb(() => firebase.firestore())
    }
    if(db && !data){
      db.collection('visitors').get().then(listOfDocs =>{
        let res = listOfDocs.docs.map(doc => {
          const temp = doc.data()
          const newOBj = []
          newOBj.push(temp.date.toDate())
          newOBj.push(parseInt(temp.visitors) || -1)
          return newOBj
        })
        res = res.filter((e)=>e[1]!==-1)
        setData(res.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return a[0] - b[0]
        }))
        
        
      })
    }
    if(data){console.log(data)}
  },[db,data])
  return (
    <div className="App">
      <div className="ChartContainer" >
        <div style={{"paddingTop":'50px'}}/>
        {data && <Chart data={data}/>}
      </div>
    </div>
  );
}

export default App;
