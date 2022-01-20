const express = require("express");
const { base64encode} = require("nodejs-base64");

const request = require("request");

const cors = require("cors");
const dotenv = require("dotenv")

const app = express();


dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
  
  //authorization code generated at client side
  const { code } = req.body.code;
  console.log(code);
  console.log(process.env.CLIENT_ID,process.env.CLIENT_SECRET);
  if (code) {
    try {
      
      //convert client_id&client_secret to base64 and pass as Authorization Header
      const authorizationString = base64encode(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      );

      //convert data to querystring
      const data = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000",
      }).toString();
      

      const options = {
        method: "POST",
        url: "https://apis.indeed.com/oauth/v2/tokens",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Basic ${authorizationString}`,
        },
        form: data,
      };

      //generating user access token
      request(options, (error, response, body) => {
        if (error) throw new Error(error);
        console.log(body);
        res.status(200).send({ data: body });
      });

    } catch (error) {
      console.log("Inside catch", error);
    }
    
  }
  else{
    res.status(400).send({ data:'invalid_request' });
  }

  
});
app.listen(5000, () => console.log(`Server is up and running at 5000!`));
