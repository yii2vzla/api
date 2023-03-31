const express = require('express');
const app =  express();
const cors = require('cors');
app.use(express.json());
app.use(cors());


const jwt = require('jsonwebtoken');   
const uuid = require('uuid');
const uuidv4 = uuid.v4();
const jws = require("jws");



app.get('/',(req,res) =>{
  console.log(req.body);
   res.send('Hola mundo'+req.body);

})

app.listen(3000,()=>{
    console.log('Servidor UP en http://localhost:3000');
});

app.post('/login', async(req,res)=>{
  console.log("BODY: " + req.body.usuario);
  let { usuario, passw } = req.body;
  let usuarios = [{user: String, passw: String}];
  let i = false;
  usuarios[0]={
    user: "usuario1",
    passw: "123456"
  };
  usuarios[1]={
    user: "usuario2",
    passw: "789"
  };
for await(u of usuarios){
  if (u.user==usuario && u.passw==passw)
      i=true;
};
  console.log("existe:"+i);
 // var indexusuario = usuario.indexOf(login); 
  //console.log(indexusuario);

   if (i===true){
   // const url =  "https://tableau.mozark.co/views/DeviceMonitoringandAvailabilityDashboard/DeviceUsage?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";
    const connectedAppClientId = "a90ec20d-6526-47c6-81ba-b130124b8401";
    const connectedAppSecretId = "7c07e75a-7740-4de2-ad8d-2d3c62f59367";
    const connectedAppSecretKey = "TXR6dE6fZiuWn+ijm1M0JtseGsmASS1hL0u9099TOEY=";
    const userName = "digital@massminority.com";
    let data = {
        iss: connectedAppClientId,
        exp: Math.round(new Date().getTime() / 1000) + 100,
        jti: uuid.v4(),
        aud: "tableau",
        sub: userName,
        scp: ["tableau:views:embed", "tableau:metrics:embed"]
    };
    let header = {
        alg: "HS256",
        typ: "JWT",
        kid: connectedAppSecretId,
        iss: connectedAppClientId
    };

      const token = jws.sign({
        header: header,
        payload: data,
        secret: connectedAppSecretKey
      });

      console.log(token);
      res.send({token: token});
      //console.log(uuid.v4()) ; 
      /*res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script type="module" src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"></script>
      </head>
      <body>
        <tableau-viz id="tableauViz"       
        src='https://us-east-1.online.tableau.com/t/mmtechnology/views/BAM-iPhone-Phase1-defaultiPhone_Racing_v3_600px/iPhone_BAM_MainScreen'     
        token="${token}" 
        height='600px' width='1200px' toolbar='bottom' hide-tabs>
      </tableau-viz>
      </body>
      </html>
      `);*/
    }else{
      res.send({message: 'Usuario o password incorrecto'});
    };

});

