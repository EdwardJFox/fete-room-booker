import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import TextField from '../../../components/form/TextField';
import LoggedInPageWrapper from '../../../components/LoggedInPageWrapper';
import prisma from "../../../lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';
import AdminGroupMembers from './components/AdminGroupMembers';

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(query.id)
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

  return {}
}

const AdminGroupsEdit: NextPage = ({ group }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(group);

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

  const handleInputChange = (value: any, name: string) => {
    const newValues = { ...formData };
    newValues[name] = value;
    setFormData(newValues);
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

        <Link href="/admin/groups">Back</Link>
        <h1>Edit Group - { group.name }</h1>

        <TextField
          label="Name"
          name="name"
          value={formData["name"]}
          onChange={handleInputChange} />

        <TextField
          label="Code"
          name="code"
          value={formData["code"]}
          onChange={handleInputChange} />

        <AdminGroupMembers          
          members={formData.members}
          setMembers={handleMembersUpdate} />

        <button onClick={submitGroup}>Save</button>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminGroupsEdit
