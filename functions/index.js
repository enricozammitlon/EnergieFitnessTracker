const functions = require("firebase-functions");
const scraper =   require('./helpers/scraper')
const admin = require('firebase-admin');
const { 
   v4: uuidv4,
 } = require('uuid');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.addDataPoint = functions.pubsub.schedule('every 15 minutes').onRun(async (context) => {
    admin.initializeApp();
    const db = admin.firestore();
    functions.logger.info("New Entry", {structuredData: true});
    const uname = process.env['USERNAME']
    const upass = process.env['PASSWORD']
    const members = await scraper.getDataPoint(uname,upass)
    const now = new Date()
    const data = {
      date: now,
      visitors: members,
    };
    
    const res = await db.collection('visitors').doc(uuidv4()).set(data);
    response.send(now+' : '+members)
 });
