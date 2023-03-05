import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import prisma from "../lib/prismadb";
import { authOptions } from './api/auth/[...nextauth]'
import HomeLoggedOutScreen from '../components/screens/Home/loggedOut';
import LoggedInWithGroupScreen from '../components/screens/Home/loggedIn/WithGroup';
import LoggedInNoGroupScreen from '../components/screens/Home/loggedIn/NoGroup';

export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email
      },
      include: {
        groupMember: {
          include: {
            group: true
          }
        },
        preferences: true
      },
    })

    let group;

    if (user.groupMember) {
      // Don't want to include group members 
      const memberWhere = user?.groupMember.owner ? {} : { approved: true }
      // Only get the full group info if we're an approved member
      const groupInclude = user?.groupMember.approved ?
        {
          members: {
            orderBy: [
              {
                owner: 'desc',
              },
              {
                approved: 'asc'
              }
            ],
            include: {
              user: {
                select: {
                  name: true,
                  image: true
                }
              }
            },
            where: memberWhere
          }
        }
      : 
        {
          members: false
        }
  
      group = await prisma.group.findUnique({
        where: {
          id: user.groupMember.groupId
        },
        include: groupInclude
      })
    }

    return {
      props: { 
        loggedIn: true,
        user: JSON.parse(JSON.stringify(user)),
        group: group ? JSON.parse(JSON.stringify(group)) : null
      }
    }
  }

  return {
    props: {
      loggedIn: false
    }
  }
}

const Home: NextPage = ({ loggedIn, user, group }) => {
  return (
    <>
      <Head>
        <title>Fete 3 - Accommodation Organiser</title>
      </Head>

      { loggedIn ?
        user.groupMember ?
          <LoggedInWithGroupScreen user={user} group={group} />
          :
          <LoggedInNoGroupScreen user={user} />
        :
        <HomeLoggedOutScreen />
      }
    </>
  )
}

export default Home
