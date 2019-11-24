import React from 'react'
import Head from 'next/head'
import axios from 'axios'

const Home = () => {

return (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* <Link href="/auth/google"> */}
      <a href="/auth/google">
        Login with google!
      </a>
    {/* </Link> */}
  </div>
)
} 

export default Home
