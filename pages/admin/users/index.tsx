import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import Link from 'next/link';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import LoggedInPageWrapper from '../../../components/LoggedInPageWrapper';
import { Table, TBody, TH, THead, TR, TD } from '../../../components/Table';
import prisma from "../../../lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';

const PAGINATION = 25;

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const users = await prisma.user.findMany({
      skip: query?.page ? (query.code - 1) * PAGINATION  : 0,
      take: PAGINATION,
    })

    return {
      props: { 
        users: JSON.parse(JSON.stringify(users))
      }
    }
  }

  return {}
}

const AdminUsersIndex: NextPage = ({ users }) => {
  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>User Admin</title>
        </Head>

        <h1>Users Admin</h1>

        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Email</TH>
              <TH>Admin</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            { users.map((user) => 
              <TR key={user.id}>
                <TD>{ user.name }</TD>
                <TD>{ user.email }</TD>
                <TD>{ user.admin ? "Yes" : "No" }</TD>
                <TD><Link href={`/admin/users/${user.id}`}>Edit</Link></TD>
              </TR>
            )}
          </TBody>
        </Table>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminUsersIndex
