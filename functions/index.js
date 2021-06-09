const functions = require("firebase-functions");
const scraper =   require('./helpers/scraper')
const admin = require('firebase-admin');
const { 
   v4: uuidv4,
 } = require('uuid');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.addDataPoint = functions.runWith({
   timeoutSeconds: 120,
   memory: "2GB"
 }).pubsub.schedule('every 15 minutes').onRun(async (context) => {
      (async () => {
         admin.initializeApp(functions.config().firebase);
         const db = admin.firestore();
         const now = new Date()
         functions.logger.info("New Entry", now);
         const uname = functions.config()["energie-fitness-tracker"].username
         const upass = functions.config()["energie-fitness-tracker"].password
         const members = await scraper.getDataPoint(uname,upass)
         const data = {
            date: now,
            visitors: members,
         };
         
         const result = await db.collection('visitors').doc(uuidv4()).set(data);
         res.send(now+' : '+members)
      })();
 });
