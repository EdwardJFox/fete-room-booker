import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';

const GroupsCreate: NextPage = () => {
  const [groupName, setGroupName] = useState();

  return (
    <>
      <Head>
        <title>Create Group</title>
      </Head>
      
      <p>Creating a group will allow you to organise your accommodation with your friends at Fete 3!</p>

      <input
    </>
  )
}

export default GroupsCreate
