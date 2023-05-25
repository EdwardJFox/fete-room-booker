import { Prisma } from '@prisma/client';
import { format, parseISO } from 'date-fns'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminPageWrapper from 'components/AdminPageWrapper';
import Button from 'components/Button';
import CheckBox from 'components/form/CheckBox';
import TextField from 'components/form/TextField';
import InfoMessage from 'components/InfoMessage';
import LoggedInPageWrapper from 'components/LoggedInPageWrapper';
import UserPreferencesView from 'components/UserPreferences/View';
import prisma from "lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import ButtonLink from 'components/Button/ButtonLink';

type AdminUsersEditProps = {
  user: Prisma.UserGetPayload<{
    include: {
      preferences: true,
      groupMember: {
        include: {
          group: true
        }
      }
    }
  }>;
}

export const getServerSideProps: GetServerSideProps<AdminUsersEditProps> = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(query.id as string)
      },
      include: {
        preferences: true,
        groupMember: {
          include: {
            group: true
          }
        }
      }
    })

    return {
      props: { 
        user: JSON.parse(JSON.stringify(user))
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

const AdminUsersEdit: NextPage<AdminUsersEditProps> = ({ user }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(user);
  const [error, setError] = useState(null);

  const submitUser = () => {
    fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formData.name,
        admin: formData.admin,
      })
    }).then((res) => {
      if (res.ok) {
        router.push("/admin/users")
      } else {
        return res.json().then(({ error }) => { throw new Error(error) });
      }
    }).catch((err) => {
      setError(err.message);
    })
  }

  const handleInputChange = (value: string | boolean, field: string) => {
    setFormData({ ...formData, [field]: value });
  }

  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>Edit User Admin</title>
        </Head>

        <div className="max-w-5xl mx-auto">
          <HeaderBreadcrumbs pages={[
            {
              href: '/admin',
              title: 'Admin Dash'
            }, {
              href: '/admin/users',
              title: 'Users'
            }, {
              href: `/admin/users/${ user.id }`,
              title: `Edit User`
            }
          ]} />

          {/* <button onClick={removeUser}>Remove</button> */}
          <div className="my-4 px-6 py-5 bg-secondary-600 rounded-md">
            <TextField
              label="Name/Tag"
              name="name"
              value={formData["name"] || ""}
              onChange={handleInputChange}
              className="w-72" />
            
            <p className="mt-2 mb-1"><b>Email:</b> { user.email }</p>
            <p className="my-1"><b>Email invite sent at:</b> { user.sentInviteEmailAt ? format(parseISO(user.sentInviteEmailAt as unknown as string), 'HH:mm MM/dd/yyyy') : 'Not sent' }</p>
            <p className="my-1"><b>Email verified at:</b> { user.emailVerified ? format(parseISO(user.emailVerified as unknown as string), 'HH:mm MM/dd/yyyy') : 'Not sent' }</p>

            <div className="my-3">
              <CheckBox
                label="User is an Admin"
                name="admin"
                value="admin"
                checked={formData["admin"]}
                onChange={handleInputChange} />
            </div>

            <Button onClick={submitUser}>Save</Button>

            { error && <InfoMessage style="danger" className="mt-3">{ error }</InfoMessage>}
          </div>

          <div className="my-4 px-6 py-5 bg-secondary-600 rounded-md">
            { user.groupMember ? 
              <>
                <h2 className="text-xl font-semibold mb-4">Group: { user.groupMember.group.name }</h2>
                <ButtonLink href={`/admin/groups/${ user.groupMember.group.id }`}>View Group</ButtonLink>
              </>
              :
              <h2>User not part of group</h2>
            }
          </div>

          <UserPreferencesView preferences={user.preferences} />
        </div>

      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminUsersEdit
