'use strict';

const google = require ('googleapis');

//////////////////////////////////////////
//Keys:
var OAuth2 = google.auth.OAuth2;
var _client_id = "561170070891-jf3eu2fdgh0cdrd9hr0481dqstd8vuds.apps.googleusercontent.com";
var _client_secret = "79QuJZocoy7l2wXOJN4MLJQI";
var _redirect_url = 'http://localhost:3000/oauth2callback';
var plus = google.plus('v1');
var oauth2Client = new OAuth2(_client_id, _client_secret, _redirect_url);

module.exports = {
  //get authentication code from Google
  getAuthCode: (req,res)=>{
    google.options({auth:oauth2Client}); //set as global default
    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/plus.login'
    })
    //redirect to API provider site
    res.send(url);
  },

  //2. Get token code
  getTokenCode: (req,res)=>{
    google.options({auth:oauth2Client}); //set as global default
    var code = req.query.code;
    console.log('inside getTokenCode');

    oauth2Client.getToken(code, (err,tokens)=>{
      if (!err){
        console.log("this is tokens:",tokens)
        console.log('inside getToken');
        res.cookie('token', tokens)
        oauth2Client.setCredentials(tokens);

          plus.people.get({userId: 'me', auth: oauth2Client }, (err,response)=>{
            // console.log(typeof response);
            var data = response;
            console.log('wwwdwdwdwdwdwdwdw', data.displayName);
            res.cookie('username', data.displayName);
            //req.username = data.displayName;
            // res.redirect('/messages');
            res.redirect('/');
          })
        // }
      }
    })
  },
}
