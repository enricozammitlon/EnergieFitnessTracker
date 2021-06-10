const scraper =   require('./helpers/scraper')
const admin = require('firebase-admin');
const cron = require('node-cron');
const express = require('express');

const { 
   v4: uuidv4,
 } = require('uuid');

app = express();
app.listen(3000);
const config = {
   "type": "service_account",
   "project_id": "energie-fitness-tracker",
   "private_key_id": "493a990720c6dc158d6040adb0f7306acc3385d1",
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCzbpQtewgAAw/4\nGZzOYR76ki7R3fH49cASFxAmLPn2nVYs88obJDVBKikvoNuZk0BQ4JZfeoNpvchP\nmxqUgCjWjnEQJKYeVn9ERxr1C4tZf2TQGGRzEjVc1LGAGwzxybx1t5NrIIkxb0Qn\n39n8NZRw5BLXQTY6/NqpcEmss//4e12teaPD86snhN7umqFfqtMdoXjT8n4RJMwK\nb812rTsBpIxSHNJwKIwPa4kDyXjMUd3BcR3xaczLc/mYmxLjazTQJEm4LGDgUrl6\n8MpO43JfcdX229xWifCKV0jY6medoauUZ3mPsmVFK9+epDgqzgZ08BFGcdBm2IjB\n1pSK5WhpAgMBAAECggEABW+gsp4LGID/P1t7Si9cEmhSXc5VEd9UIdgsB5QOQJ/0\np+j84wSeTmqaE9TSQl1ZMfoT5DGggJgc1PiUfhJB6nonR79sfvfM5EMpOGpQnvYC\nlmFezbOsBTN2azSmmD6t5H0azMCQF3zQ+kpIXuE6rY7jWT0jCPd3InIB8WcEpsD9\nA7Bv1sVAwNrJ0jWEdbznAnBDPicEks6h7ZJHIakmNhAGpMUnN1eLPpDENaR5rDhq\n71Q5U4nWm7zh+qwlDkvLTN1ggtyhiotBGCUTM7805wFdabTAVHyb/YEwEMx7Q+Wx\ncdMpzyno6pMAHOsNmO0ilmYhfenZDcFZ1/7TStOdPwKBgQDqzC2U4NknXWRaBjFE\nzVFFGLBaHprRXwpFWtiozCVPMTPTRJtej+xnU0v41yFR/lAx+TYVcA113CvyBET+\nIZtSMm/x7M5LuSDS2vky5ihYlQbHF37TDTk9RB2pvSLT3tO/Wp0jU8Jqjx+NgsDF\nRTOKmLMG6SpuLatVumrKczBdvwKBgQDDooMcE4G5WRw93XkR4rGmWBHYlCwxx2pv\nc4tyzvu4mYxJzu8dCfnsolW+qsuyanUMMYzCAjW0ZxAbwCh5I/Nk8tfQ5dhjx9/A\naKHemqPwDY8Km8fKJGIcBOWMByTaas8KAeIbp9Pcelyv++Qn7Ik0bRGKAQvy8Hg6\nAuLz2Q6T1wKBgQCucozbNEOjD6xjhn5MlA9xuuorytlT/bzv0pNutl5x/Ch5K1wU\nYfJOwoCLnarP9Jc4yeP5AYu+qZqs8acg+W8hHwA1Sq/ratyMTM0hmAcZ6X9jpH1B\n6W1Bq74uQqwBpmjEn1poyO6FpVjYFvGKn+OvccxxsgMoYR4PT7XQPM0OmQKBgQCp\nbbdKu4IfuZMB6SsPWFsuixt5jGnx+pitSU498hCDQUgELBld9uPiEn1cEaM0M4qH\nMuqKo0tLn+6NehATShVjGgXavxR25gVcJ8H4fcj4/2UgdOXEpVnqljsO2KkMGHCS\nZCskdGbBjZ90MhzYjrwNEWCdOmbU0XnuE83mDdfYJQKBgQDiNzmeB6/LoudrgY2A\ny8T+MWLqDI+5kauaJlT+CPEzOc1B53SI6XfrHrZeu1fxvWQcT4AzKm/tXUKZeY/y\nHA+6L2vnBAxs7tYVhyxQN+1A62aC/DZLwrJnUenu4rtImGdCNoquEfQ/047r+jWQ\ncdtTu8uYFBmhYDFff0as+eFFyg==\n-----END PRIVATE KEY-----\n",
   "client_email": "nodejs@energie-fitness-tracker.iam.gserviceaccount.com",
   "client_id": "117216976195631260792",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nodejs%40energie-fitness-tracker.iam.gserviceaccount.com"
 };

const serviceAccount = require('./service.json'); //process.env.serviceAccount || config
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
cron.schedule('* * * * *', scheduled);

 
