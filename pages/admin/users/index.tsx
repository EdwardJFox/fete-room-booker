import { Prisma, User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import { ReactElement } from 'react';

import ListMeta from 'components/ListMeta';
import Pagination from 'components/Pagination';
import AdminPageWrapper from 'components/AdminPageWrapper';
import ButtonLink from 'components/Button/ButtonLink';
import LoggedInPageWrapper from 'components/LoggedInPageWrapper';
import NoRecordsFound from 'components/NoRecordsFound';
import { Table, TBody, TH, THead, TR, TD } from 'components/Table';
import prisma from "lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { useIndexMeta } from 'hooks/useIndexMeta';
import { buildMeta } from 'services/buildMeta';
import { IndexMeta } from 'types/meta';

const PAGINATION = 25;

type AdminUsersIndexProps = {
  users: User[];
  meta: IndexMeta;
};

export const getServerSideProps: GetServerSideProps<AdminUsersIndexProps> = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const search = query.search as string;
    const where = search ? {
      OR: [
        { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } }
      ]
    } : {};

    const users = await prisma.user.findMany({
      skip: query?.page ? (parseInt(query.page as string) - 1) * PAGINATION  : 0,
      take: PAGINATION,
      where,
    });
    
    const totalUsers = await prisma.user.aggregate({
      _count: true,
      where
    });

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        meta: buildMeta(query, PAGINATION, totalUsers._count)
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

const AdminUsersIndex: NextPage<AdminUsersIndexProps> = ({ users, meta }): ReactElement => {
  const { handlePageChange, handleSearchChange } = useIndexMeta('/admin/users', meta);

  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>User Admin</title>
        </Head>

        <div className="max-w-5xl mx-auto mb-8">
          <HeaderBreadcrumbs pages={[
            {
              href: '/admin',
              title: 'Admin Dash'
            }, {
              href: '/admin/users',
              title: 'Users'
            }
          ]} />

          <ListMeta pagination={meta.pagination} onSearchTermChange={handleSearchChange} />

          <div className="bg-secondary-600 rounded-md py-2">
            { meta.pagination.total === 0 ?
              <NoRecordsFound />
            :
              <>
                <Table className="text-white text-sm">
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

                <Pagination
                  totalCount={meta.pagination.total}
                  perPage={meta.pagination.perPage}
                  currentPage={meta.pagination.page}
                  numberOfPages={meta.pagination.numberOfPages}
                  onPageChange={handlePageChange}
                />
              </>
            }
          </div>
        </div>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminUsersIndex
