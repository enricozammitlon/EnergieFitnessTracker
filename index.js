require ('newrelic');
const scraper =   require('./helpers/scraper')
const admin = require('firebase-admin');
const cron = require('node-cron');
const express = require('express');

const { 
   v4: uuidv4,
 } = require('uuid');

app = express();
app.listen(process.env.PORT || 5000);
const serviceAccount = JSON.parse(process.env.serviceAccount) || require('./service.json');
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
  });

const scheduled = (async () => {
   
   const db = admin.firestore();
   const now = new Date()
   console.log(now);
   const uname = process.env.USERNAME
   const upass = process.env.PASSWORD
   const members = await scraper.getDataPoint(uname,upass)
   const data = {
      date: now,
      visitors: members,
   };
   
   const result = await db.collection('visitors').doc(uuidv4()).set(data);
   console.log(result)
   //res.send(now+' : '+members)
   return null
})


//scheduled()
cron.schedule('*/5 * * * *', scheduled);

 
