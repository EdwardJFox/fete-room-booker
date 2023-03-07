import { User } from '@prisma/client';
import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import { ReactElement } from 'react';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import ButtonLink from '../../../components/Button/ButtonLink';
import LoggedInPageWrapper from '../../../components/LoggedInPageWrapper';
import { Table, TBody, TH, THead, TR, TD } from '../../../components/Table';
import prisma from "../../../lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

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

type AdminUsersIndexProps = {
  users: User[];
}

const AdminUsersIndex: NextPage<AdminUsersIndexProps> = ({ users }): ReactElement => {
  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>User Admin</title>
        </Head>

        <div className="max-w-5xl mx-auto">
          <HeaderBreadcrumbs pages={[
            {
              href: '/admin',
              title: 'Admin Dash'
            }, {
              href: '/admin/users',
              title: 'Users'
            }
          ]} />

          <div className="bg-secondary-600 rounded-md p-4">
            <Table className="text-white">
              <THead>
                <TR>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Signed up</TH>
                  <TH>Admin</TH>
                  <TH>Actions</TH>
                </TR>
              </THead>
              <TBody>
                { users.map((user) => 
                  <TR key={user.id} className="odd:bg-secondary-400">
                    <TD>{ user.name }</TD>
                    <TD>{ user.email }</TD>
                    <TD>{ user.emailVerified ? "Yes" : "No" }</TD>
                    <TD>{ user.admin ? "Yes" : "No" }</TD>
                    <TD>
                      <ButtonLink href={`/admin/users/${user.id}`} size="sm">Edit</ButtonLink>
                    </TD>
                  </TR>
                )}
              </TBody>
            </Table>
          </div>
        </div>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminUsersIndex
