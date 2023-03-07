import { Group, Prisma } from '@prisma/client';
import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
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
        redirect: {
          destination: '/',
          permanent: true,
        },
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
    }
  }
}

type JoinGroupProps = {
  group: Group;
}

const JoinGroup: NextPage<JoinGroupProps> = ({ group }) => {
  const router = useRouter()
  const { code } = router.query;

  const [error, setError] = useState<null | string>();

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
        <title>Join Group</title>
      </Head>

      <LoggedInPageWrapper>
        <div className="m-4 p-6 bg-secondary-600 rounded-md max-w-xl sm:mx-auto">

          { !group && 
            <>
              <h1>Group not found!</h1>
              <p>Check the code and try again</p>
            </>
          }
          { group &&
            <>
              <h1>You have been invited to join:</h1>
              <h1>{ group.name }</h1>
              <p className="my-4">Do you want to join this group?</p>
              <Button onClick={joinGroup}>Join</Button>
            </>
          }
        </div>
      </LoggedInPageWrapper>
    </>
  )
}

export default JoinGroup
