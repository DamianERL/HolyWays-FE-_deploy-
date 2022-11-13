import Head from 'next/head'
import React from 'react'

export default function Layout(props) {
  return (
    <div>
        <Head>
            <title>{props.title}</title>
            <link rel="icon" href="https://res.cloudinary.com/fnxr/image/upload/v1667916022/holyways/Icon_1_g1de1c.svg" />
        </Head>
        {props.children}
    </div>
  )
}
