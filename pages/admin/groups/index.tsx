import { Prisma } from '@prisma/client';
import ListMeta from 'components/ListMeta';
import NoRecordsFound from 'components/NoRecordsFound';
import Pagination from 'components/Pagination';
import { useIndexMeta } from 'hooks/useIndexMeta';
import type { GetServerSidePropsContext, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import { buildMeta } from 'services/buildMeta';
import { IndexMeta } from 'types/meta';
import AdminPageWrapper from 'components/AdminPageWrapper';
import ButtonLink from 'components/Button/ButtonLink';
import LoggedInPageWrapper from 'components/LoggedInPageWrapper';
import { Table, TBody, TH, THead, TR, TD } from 'components/Table';
import prisma from "lib/prismadb";
import { authOptions } from '../../api/auth/[...nextauth]';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

const PAGINATION = 25;

export const getServerSideProps = async ({ req, res, query }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const search = query.search as string;
    const where = search ? {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } }
      ]
    } : {};

    const groups = await prisma.group.findMany({
      skip: query?.page ? (parseInt(query.page as string) - 1) * PAGINATION  : 0,
      take: PAGINATION,
      include: {
        members: true
      },
      where
    })
    
    const totalGroups = await prisma.group.aggregate({
      _count: true,
      where
    });

    return {
      props: { 
        groups: JSON.parse(JSON.stringify(groups)),
        meta: buildMeta(query, PAGINATION, totalGroups._count)
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

type AdminGroupsIndexProps = {
  groups: Prisma.GroupGetPayload<{
    include: {
      members: true
    }
  }>[];
  meta: IndexMeta;
}

const AdminGroupsIndex: NextPage<AdminGroupsIndexProps> = ({ groups, meta }) => {
  const { handlePageChange, handleSearchChange } = useIndexMeta('/admin/groups', meta);

  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <>
          <Head>
            <title>Groups Admin</title>
          </Head>

          <div className="max-w-5xl mx-auto mb-8">
            <HeaderBreadcrumbs pages={[
              {
                href: '/admin',
                title: 'Admin Dash'
              }, {
                href: '/admin/groups',
                title: 'Groups'
              }
            ]} />

            <ListMeta pagination={meta.pagination} onSearchTermChange={handleSearchChange} />

            <div className="bg-secondary-600 rounded-md pt-4">

              { meta.pagination.total === 0 ?
                <NoRecordsFound />
              :
                <>
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
        </>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminGroupsIndex
