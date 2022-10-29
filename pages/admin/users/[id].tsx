import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import CheckBox from '../../../components/form/CheckBox';
import TextField from '../../../components/form/TextField';
import LoggedInPageWrapper from '../../../components/LoggedInPageWrapper';
import { Table, TBody, TH, THead, TR, TD } from '../../../components/Table';
import { H1 } from '../../../components/Typography';
import prisma from "../../../lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';

const PAGINATION = 25;

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(query.id)
      }
    })

    return {
      props: { 
        user: JSON.parse(JSON.stringify(user))
      }
    }
  }

  return {}
}

const AdminUsersEdit: NextPage = ({ user }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(user);

  const submitUser = () => {
    fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formData.name,
        admin: formData.admin,
      })
    }).then((res) => {
      if (res.status === 200) {
        router.push("/admin/users")
      }
    })
  }

  // const removeUser = () => {
  //   if (confirm("Please confirm you want to remove this user from the system")) {
  //     fetch(`/api/admin/users/${user.id}`, {
  //       method: "DELETE"
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         router.push("/admin/users")
  //       }
  //     })
  //   }
  // }

  const handleInputChange = (value: string, name: string) => {
    const newValues = { ...formData };
    newValues[name] = value;
    setFormData(newValues);
  }

  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>{ user.name } - User Admin</title>
        </Head>

        <H1>Edit { user.name }</H1>
        {/* <button onClick={removeUser}>Remove</button> */}

        <TextField
          label="Name"
          name="name"
          value={formData["name"]}
          onChange={handleInputChange} />

        <CheckBox
          label="Admin"
          name="admin"
          value={formData["admin"]}
          onChange={handleInputChange} />

        <button onClick={submitUser}>Save</button>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminUsersEdit
