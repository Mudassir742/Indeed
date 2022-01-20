import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import axios from 'axios'


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      
      const code = router.query;
      
      //console.log(code)
      const getAccessToken = async()=>{
        const config = {
          method:"post",
          data:{
            code
          },
          url:"http://localhost:5000/"
        }
        const response = await axios(config)

        console.log(response.data)
      }

      getAccessToken()
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
