import { Prisma } from '@prisma/client';
import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
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
    const groups = await prisma.group.findMany({
      skip: query?.page ? (query.code - 1) * PAGINATION  : 0,
      take: PAGINATION,
      include: {
        members: true
      }
    })

    return {
      props: { 
        groups: JSON.parse(JSON.stringify(groups))
      }
    }
  }

  return {}
}

type AdminGroupsIndexProps = {
  groups: Prisma.GroupGetPayload<{
    include: {
      members: true
    }
  }>[];
}

const AdminGroupsIndex: NextPage<AdminGroupsIndexProps> = ({ groups }) => {
  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <>
          <Head>
            <title>Groups Admin</title>
          </Head>

          <div className="max-w-5xl mx-auto">
            <HeaderBreadcrumbs pages={[
              {
                href: '/admin',
                title: 'Admin Dash'
              }, {
                href: '/admin/groups',
                title: 'Groups'
              }
            ]} />

            <div className="bg-secondary-600 rounded-md p-4">
              <Table className="text-white">
                <THead>
                  <TR>
                    <TH>Name</TH>
                    <TH>Member count</TH>
                    <TH>Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  { groups.map((group: any) => 
                    <TR key={group.id} className="odd:bg-secondary-400">
                      <TD>{ group.name }</TD>
                      <TD>{ group.members.length }</TD>
                      <TD>
                        <ButtonLink href={`/admin/groups/${group.id}`} size="sm">Edit</ButtonLink>
                      </TD>
                    </TR>
                  )}
                </TBody>
              </Table>
            </div>
          </div>
        </>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminGroupsIndex
