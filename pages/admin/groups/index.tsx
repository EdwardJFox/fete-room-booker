import type { NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Head from 'next/head'
import Link from 'next/link';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import LoggedInPageWrapper from '../../../components/LoggedInPageWrapper';
import { Table, TBody, TH, THead, TR, TD } from '../../../components/Table';
import { H1 } from '../../../components/Typography';
import prisma from "../../../lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';

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

const AdminGroupsIndex: NextPage = ({ groups }) => {
  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>Groups Admin</title>
        </Head>

        <H1>Groups Admin</H1>

        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Member count</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            { groups.map((group: any) => 
              <TR key={group.id}>
                <TD>{ group.name }</TD>
                <TD>{ group.members.length }</TD>
                <TD><Link href={`/admin/groups/${group.id}`}>Edit</Link></TD>
              </TR>
            )}
          </TBody>
        </Table>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminGroupsIndex
