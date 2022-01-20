import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import axios from 'axios'



// export async function getServerSideProps() {
  
//   const authorization = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`

//   const config = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "application/json",
//       Authorization:"Basic "+authorization
//     },
//     body: JSON.stringify({
//       code: 'TuL6BQ_EAC8',
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       redirect_uri: "http://localhost:3000",
//       grant_type:'authorization_code'
//     }),
//   };

//   const response = await fetch(
//     "https://apis.indeed.com/oauth/v2/tokens",
//     config
//   );

//   console.log(response)

//   // const data = await response.json()
//   // console.log(data);

//   return {
//     props: {
//       data:"null"
//     },
//   }
// }

export default function Home() {

  //console.log(props)
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      
      const code = router.query;
      
      console.log(code);


      const getAccessToken = async()=>{
        const config = {
          method:"post",
          data:{
            code
          },
          url:"http://localhost:5000/"
        }
        const response = await axios(config)

        console.log(response)
      }

      getAccessToken()

      // const getAccessToken = async () => {
      //   const requestOptions = {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //       "Accept": "application/json",
      //       "Access-Control-Allow-Origin":"http://localhost:3000",
      //       "Access-Control-Allow-Credentials":"true"
      //     },
      //     body: JSON.stringify({
      //       code: code,
      //       client_id: process.env.CLIENT_ID,
      //       client_secret: process.env.CLIENT_SECRET,
      //       redirect_uri: process.env.REDIRECT_URI,
      //       grant_type: "authorization_code",
      //     }),
      //   };

      //   try {
      //     const response = await fetch(
      //       "https://apis.indeed.com/oauth/v2/tokens",
      //       requestOptions
      //     );
      //     console.log(response.json());
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };

      //getAccessToken();
    }
  }, [router.isReady, router.query]);

  return (
    <div className={styles.container}>
      <Link
        href={`https://secure.indeed.com/oauth/v2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`}
      >
        Indeed
      </Link>
    </div>
  );
}
