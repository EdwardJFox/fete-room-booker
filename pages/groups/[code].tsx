import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoggedInPageWrapper from '../../components/LoggedInPageWrapper';
import { H1, P } from '../../components/Typography';
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

    if (user.groupMember) {
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
    if (user.groupMember) {
      router.push("/")
    }
  }, [])


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
            <H1>Group not found!</H1>
            <P>Check the code and try again</P>
          </>
        }
        { group &&
          <>
          <H1>You have been invited to join { group.name }</H1>
            <P>Do you want to join this group?</P>
            <button onClick={joinGroup}></button>
          </>
        }
      </LoggedInPageWrapper>
    </>
  )
}

export default JoinGroup
