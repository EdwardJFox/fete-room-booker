import { Prisma } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminPageWrapper from 'components/AdminPageWrapper';
import Button from 'components/Button';
import TextField from 'components/form/TextField';
import LoggedInPageWrapper from 'components/LoggedInPageWrapper';
import prisma from "lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import AdminGroupMembers from './components/AdminGroupMembers';

type AdminGroupsEditProps = {
  group: Prisma.GroupGetPayload<{
    include: {
      members: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    }
  }>;
}

export const getServerSideProps: GetServerSideProps<AdminGroupsEditProps> = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(query.id as string)
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true
              }
            }
          },
          orderBy: [
            {
              userId: 'asc',
            }
          ],
        }
      }
    })

    return {
      props: { 
        group: JSON.parse(JSON.stringify(group))
      }
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  }
}

const AdminGroupsEdit: NextPage<AdminGroupsEditProps> = ({ group }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: group.name,
    members: group.members,
    code: group.code,
  });

  const submitGroup = () => {
    fetch(`/api/admin/groups/${group.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formData.name,
        members: formData.members
      })
    }).then((res) => {
      if (res.status === 200) {
        router.push("/admin/groups")
      }
    })
  }

  const handleInputChange = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value });
  }

  const handleMembersUpdate = (members: any) => {
    const newValues = { ...formData };
    newValues.members = members;
    setFormData(newValues);
  }

  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>{ group.name } - Group Admin</title>
        </Head>

        <div className="max-w-5xl mx-auto">
          <HeaderBreadcrumbs pages={[
            {
              href: '/admin',
              title: 'Admin Dash'
            }, {
              href: '/admin/groups',
              title: 'Groups'
            }, {
              href: `/admin/groups/${ group.id }`,
              title: `Edit Group`
            }
          ]} />

          <div className="mx-2 sm:mx-auto my-4 px-6 py-5 bg-secondary-600 rounded-md">
            <div className="flex mb-4">
              <TextField
                label="Name"
                name="name"
                value={formData["name"]}
                onChange={handleInputChange}
                className="flex-1 mr-2"
                max={30} />

              <TextField
                label="Code"
                name="code"
                value={formData["code"]}
                onChange={handleInputChange}
                className="flex-1 ml-2" />
            </div>

            <Button onClick={submitGroup} className="mb-8">Save</Button>

            <AdminGroupMembers          
              members={formData.members}
              setMembers={handleMembersUpdate} />
          </div>
        </div>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminGroupsEdit
