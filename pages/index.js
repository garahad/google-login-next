import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Link from 'next/link'
import axios from 'axios'

const Home = () => {
  const googleLogin = () => {

  }

return (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Link href="/auth/google">
      <a>
        Login with google!
      </a>
    </Link>
  </div>
)
} 

export default Home
