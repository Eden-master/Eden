module.exports = ()=>{
var oauth2 = '/oauth2';
var oauth2callback = '/oauth2callback';
  //1. Get authorizaion code

  app.get(oauth2,getAuthCode
    getAuthCode: (req,res)=>{
    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/plus.login'
    })
    //redirect to API provider site
    res.redirect(url);
  });

  //2. Get token code
  app.get(oauth2callback ,(req,res)=>{
    var code = req.query.code;
    console.log(code)

    oauth2Client.getToken(code, (err,tokens)=>{
      if (!err){
        console.log("this is tokens:",tokens)
        res.cookie('token', tokens)
        oauth2Client.setCredentials(tokens);
        getData(res);

      }
    })
  });

  //3. Function that is called inside getToken APi to get client data
  var getData = (res)=>{
    plus.people.get({userId: 'me', auth: oauth2Client }, (err,response)=>{
      // console.log(typeof response);
      var data = response;
      console.log(data.displayName);
      //req.username = data.displayName;
      // res.redirect('/messages');
    })
  }


  app.get('/messages', messageController.getMessages);
  app.post('/messages', messageController.postMessages);

  //app.post('/branch' zomgBranchMethodz!);

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });

}
