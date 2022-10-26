import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router';
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper';
import GroupsMainScreen from '../../components/screens/Home/Groups/Main';
import prisma from "../../lib/prismadb";
import { authOptions } from '../api/auth/[...nextauth]'

export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email
      },
      include: {
        groupMember: {
          select: {
            groupId: true,
            owner: true,
            approved: true
          }
        }
      },
    })

    const groupWhere = user.groupMember.owner ? {} : { approved: true }

    const group = await prisma.group.findUnique({
      where: {
        id: user.groupMember.groupId
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                image: true
              }
            }
          },
          where: groupWhere
        }
      }
    })

    return {
      props: { 
        loggedIn: true,
        user: JSON.parse(JSON.stringify(user)),
        group: JSON.parse(JSON.stringify(group)),
      }
    }
  }

  return {
    props: {
      loggedIn: false
    }
  }
}

const GroupsIndex: NextPage = ({ loggedIn, user, group }) => {
  const router = useRouter()
  // If the user isn't part of a group, then move them to the join page
  if (!user.groupMember) {
    router.push("/groups/join")
  }

  return (
    <ProtectedPageWrapper>
      <Head>
        <title>Group Details</title>
      </Head>

      <GroupsMainScreen user={user} group={group} />
    </ProtectedPageWrapper>
  )
}

export default GroupsIndex
