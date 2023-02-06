import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoggedInPageWrapper from '../../components/LoggedInPageWrapper';
import prisma from "../../lib/prismadb";
import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session && query.code) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email
      },
      include: {
        groupMember: true
      },
    })

    if (user?.groupMember) {
      return {
        props: {
          user: JSON.parse(JSON.stringify(user))
        }
      }
    }

    const group = await prisma.group.findUnique({
      where: {
        code: query.code
      }
    })

    return {
      props: { 
        group: JSON.parse(JSON.stringify(group))
      }
    }
  }

  return {
    props: {
      loggedIn: false
    }
  }
}

const JoinGroup: NextPage = ({ loggedIn, user, group }) => {
  const router = useRouter()
  const { code } = router.query;

  const [error, setError] = useState<null | string>();

  useEffect(() => {
    console.log("user", user)
    if (user?.groupMember) {
      router.push("/")
    }
  }, [user])


  const joinGroup = () => {
    fetch("/api/groups/join", {
      method: "POST",
      body: JSON.stringify({
        code
      })
    }).then((res) => {
      if (res.status === 201) {
        router.push("/")
      } else {
        setError("Something went wrong")
      }
    }).catch((err) => {
      setError(err);
    })
  }

  return (
    <>
      <Head>
        <title>Join group!</title>
      </Head>

      <LoggedInPageWrapper>
        { !group && 
          <>
            <h1>Group not found!</h1>
            <p>Check the code and try again</p>
          </>
        }
        { group &&
          <>
          <h1>You have been invited to join { group.name }</h1>
            <p>Do you want to join this group?</p>
            <button onClick={joinGroup}>Join</button>
          </>
        }
      </LoggedInPageWrapper>
    </>
  )
}

export default JoinGroup
