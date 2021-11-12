const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');//Level 5 Passport Authentication
const passport = require('passport');//Level 5 Passport Authentication
const passportLocalMongoose = require('passport-local-mongoose');//Level 5 Passport Authentication
const fileUpload = require('express-fileupload');

// Methods
process.setMaxListeners(0);

const app = express();
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(bodyParser.urlencoded({
  extended: true         //Using body parser
}));
app.use(express.static("public"));
app.use(session({
  secret: 'Hey there! This is our little secret!',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/IttiransDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    password:String,
    answer:[String]
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


app.get("/",function(req,res){
  res.render("main");
});

app.get("/register",function(req,res){
  res.render("register");
});
app.get("/pass",function(req,res){
  res.render("pass");
});
app.get("/fail",function(req,res){
  res.render("fail");
})
app.get("/start",function(req,res){
  res.render("start");
})
app.get("/q1",function(req,res){
  res.render("q1");

});
app.get("/q2",function(req,res){
  res.render("q2");
});

app.get("/q3",function(req,res){
  res.render("q3");
});
app.get("/q4",function(req,res){
  res.render("q4");
});
app.get("/q5",function(req,res){
  res.render("q5");
});
app.get("/q6",function(req,res){
  res.render("q6");
});
app.get("/q7",function(req,res){
  res.render("q7");
});
app.get("/q8",function(req,res){
  res.render("q8");
});
app.get("/q9",function(req,res){
  res.render("q9");
});
app.get("/q10",function(req,res){
  res.render("q10");
});
app.get("/q11",function(req,res){
  res.render("q11");
});
app.get("/q12",function(req,res){
  res.render("q12");
});
app.get("/q13",function(req,res){
  res.render("q13");
});
app.get("/finish",function(req,res){
  res.render("finish");
});

app.get("/q1file",function(req,res){
  res.render("q1file");
});
app.get("/q2file",function(req,res){
  res.render("q2file");
});
app.get("/q3file",function(req,res){
  res.render("q3file");
});
app.get("/q4file",function(req,res){
  res.render("q4file");
});
app.get("/q5file",function(req,res){
  res.render("q5file");
});
app.get("/q6file",function(req,res){
  res.render("q6file");
});
app.get("/q7file",function(req,res){
  res.render("q7file");
});
app.get("/q8file",function(req,res){
  res.render("q8file");
});
app.get("/q9file",function(req,res){
  res.render("q9file");
});
app.get("/q10file",function(req,res){
  res.render("q10file");
});
app.get("/q11file",function(req,res){
  res.render("q11file");
});
app.get("/q12file",function(req,res){
  res.render("q12file");
});
app.get("/q13file",function(req,res){
  res.render("q13file");
});


app.post("/",function(req,res){
  const user = new User({
    name:req.body.username,
    password:req.body.password
  });
  req.login(user,function(err){
    if(err){
      console.log(err);
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/start");
      })
    }
  })

});
app.post("/register", function(req, res) {

  User.register({username:req.body.username },req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.redirect("/register");
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/");
      })
    }
  });
});
app.post("/q1",function(req,res){
  const q1answer = req.body.q1answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
          foundUser.answer.push(q1answer);
          foundUser.save();
    }
  });

});
app.post("/q1file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q2");
  }
 else{
   sampleFile = req.files.q1;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q2");
   });
 }

});

app.post("/q2",function(req,res){
  const q2answer = req.body.q2answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q2answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q2file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q3");
  }
 else{
   sampleFile = req.files.q2;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q3");
   });
 }

});
app.post("/q3",function(req,res){
  const q3answer = req.body.q3answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q3answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q3file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q4");
  }
 else{
   sampleFile = req.files.q3;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q4");
   });
 }

});
app.post("/q4",function(req,res){
  const q4answer = req.body.q4answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q4answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q4file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q5");
  }
 else{
   sampleFile = req.files.q4;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q5");
   });
 }

});
app.post("/q5",function(req,res){
  const q5answer = req.body.q5answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q5answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q5file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q6");
  }
 else{
   sampleFile = req.files.q5;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q6");
   });
 }

});
app.post("/q6",function(req,res){
  const q6answer = req.body.q6answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q6answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q6file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q7");
  }
 else{
   sampleFile = req.files.q6;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q7");
   });
 }

});
app.post("/q7",function(req,res){
  const q7answer = req.body.q7answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q7answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q7file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q8");
  }
 else{
   sampleFile = req.files.q7;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q8");
   });
 }

});
app.post("/q8",function(req,res){
  const q8answer = req.body.q8answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q8answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q8file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q9");
  }
 else{
   sampleFile = req.files.q8;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q9");
   });
 }

});
app.post("/q9",function(req,res){
  const q9answer = req.body.q9answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q9answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q9file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q10");
  }
 else{
   sampleFile = req.files.q9;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q10");
   });
 }

});
app.post("/q10",function(req,res){
  const q10answer = req.body.q10answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q10answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q10file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q11");
  }
 else{
   sampleFile = req.files.q10;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q11");
   });
 }

});
app.post("/q11",function(req,res){
  const q11answer = req.body.q11answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q11answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q11file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q12");
  }
 else{
   sampleFile = req.files.q11;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q12");
   });
 }

});
app.post("/q12",function(req,res){
  const q12answer = req.body.q12answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q12answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q12file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/q13");
  }
 else{
   sampleFile = req.files.q12;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/q13");
   });
 }

});

app.post("/q13",function(req,res){
  const q13answer = req.body.q13answer;
  User.findById(req.user.id,function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        foundUser.answer.push(q13answer);
        foundUser.save();
      }
    }
  })
});
app.post("/q13file",function(req,res){
  let sampleFile;
  let uploadPath;
 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

 if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/finish");
  }
 else{
   sampleFile = req.files.q13;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   sampleFile.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
     res.redirect("/finish");
   });
 }

});




app.listen(8080,function(){
  console.log("Server up and running on port 8080");
});
