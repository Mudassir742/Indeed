import nc from "next-connect";
import cors from "cors";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code: 'TuL6BQ_EAC8',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    };

    const response = await fetch(
      "https://apis.indeed.com/oauth/v2/tokens",
      config
    );

    console.log(response)

    res.json(response);
  });

export default handler;
