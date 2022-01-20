const axios = require("axios");
const express = require("express");
const { base64encode, base64decode } = require('nodejs-base64');
const app = express();
const cors = require("cors");
//const fetchUrl = require("fetch").fetchUrl;
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
 
  const bString = base64encode("e9a900dd2e4d4f4c51eee383b9aa015f60f67d94d5238ac207b4b75179ca8081:gwrhKJmQPZKIne9M4Bz3Oue3rMOKcnZ6Lr3FN98n0mOqBb37aykNkmsyYkwPcj6i")

  const { code } = req.body.code;
  console.log({code});

  // const url = `https://apis.indeed.com/oauth/v2/tokens?grant_type=authorization_code
  // &client_id=e9a900dd2e4d4f4c51eee383b9aa015f60f67d94d5238ac207b4b75179ca8081
  // &client_secret=gwrhKJmQPZKIne9M4Bz3Oue3rMOKcnZ6Lr3FN98n0mOqBb37aykNkmsyYkwPcj6
  // &code=${code}&redirect_uri=http://localhost/3000`
  if (code) {
    try {
      //   axios.interceptors.request.use(
      //     (req) => {
      //        console.log("req",req)
      //        return req;
      //     },
      //     (err) => {
      //       console.log('err');
      //       return Promise.reject(err);
      //     }
      //  );

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Authorization":`Basic ${bString}`
      };

      console.log(bString);

      const data = {
        code: code,
        "redirect_uri": "http://localhost:3000",
        "grant_type": "authorization_code"
      };
      const response = await axios.post(
        "https://apis.indeed.com/oauth/v2/tokens",
        {...data},
        {
          headers,
        }
      );

      // const resp = fetchUrl("https://apis.indeed.com/oauth/v2/tokens",{
      //   method:"POST",
      //   headers,
      //   body:JSON.stringify({
      //     grant_type: "authorization_code",
      //     code:code,
      //     client_id:
      //       "e9a900dd2e4d4f4c51eee383b9aa015f60f67d94d5238ac207b4b75179ca8081",
      //     client_secret:
      //       "gwrhKJmQPZKIne9M4Bz3Oue3rMOKcnZ6Lr3FN98n0mOqBb37aykNkmsyYkwPcj6i",
      //     redirect_uri: "http://localhost:3000",

      //   })
      // },(error,meta,body)=>{
      //   if(error){
      //     console.log(error.toString());
      //   }
      //   if(body){
      //     console.log(body.toString())
      //   }

      // })

      //const response = await axios.post(url, { headers: headers });

      console.log(response);
    } catch (error) {
      console.log("Inside catch", error);
    }

    return res.send({ data: "Data" });
  }

  return res.send({ data: "no code yet!" });
});
app.listen(port, () => console.log(`Server is up and running at ${port}!`));
