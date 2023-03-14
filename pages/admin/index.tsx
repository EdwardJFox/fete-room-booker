import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import Link from 'next/link';
import AdminPageWrapper from '../../components/AdminPageWrapper';
import Button from '../../components/Button';
import LoggedInPageWrapper from '../../components/LoggedInPageWrapper';
import prisma from "../../lib/prismadb";
import { authOptions } from '../api/auth/[...nextauth]';
import Tile from './components/Tile';

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const totalUsers = await prisma.user.aggregate({
      _count: true
    });

    const completedSignUpUsers = await prisma.user.aggregate({
      _count: true,
      where: {
        emailVerified: {
          not: null
        }
      },
    });

    const inGroupUsers = await prisma.user.aggregate({
      _count: true,
      where: { groupMember: { isNot: null } },
    });

    const totalGroups = await prisma.group.aggregate({
      _count: true,
    });

    const emptyGroups = await prisma.user.aggregate({
      _count: true,
      where: { groupMember: { is: null } },
    });

    return {
      props: {
        users: {
          total: totalUsers._count,
          completedSignUp: completedSignUpUsers._count,
          inGroup: inGroupUsers._count,
        },
        groups: {
          total: totalGroups._count,
          averageMembers: (inGroupUsers._count > 0 && totalGroups._count > 0) ? (inGroupUsers._count / totalGroups._count) : 0,
          empty: emptyGroups._count,
        }
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

type AdminUsersIndexProps = {
  users: {
    total: number;
    completedSignUp: number;
    inGroup: number;
  },
  groups: {
    total: number;
    averageMembers: number;
    empty: number;
  }
}

const AdminUsersIndex: NextPage<AdminUsersIndexProps> = ({ users, groups }) => {
  const getUsersExport = () => {
    fetch('/api/admin/export')
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((href) => {
        Object.assign(document.createElement('a'), {
          href,
          download: 'fete_export.csv',
        }).click();
      })
  }

  return (
    <LoggedInPageWrapper>
      <AdminPageWrapper>
        <Head>
          <title>Admin</title>
        </Head>

        <div className="max-w-5xl mx-2 sm:mx-auto">
          <h1 className="mt-4 mb-3">Admin Dashboard</h1>
          <h2>Users</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <Tile label="Users" value={users.total} />
            <Tile label="Signed up" value={users.completedSignUp} />
            <Tile label="In Group" value={users.inGroup} />
            <Link
              href="/admin/users"
              className="text-white flex items-center">
              <FontAwesomeIcon icon={faChevronRight} className="mr-2" /> User Management
            </Link>
          </div>
          <h2 className="mt-5">Groups</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <Tile label="Total" value={groups.total} />
            <Tile label="Avg Members" value={groups.averageMembers.toFixed(1)} />
            <Tile label="Empty Groups" value={groups.empty} />
            <Link
              href="/admin/groups"
              className="text-white flex items-center">
              <FontAwesomeIcon icon={faChevronRight} className="mr-2" /> Group Management
            </Link>
          </div>
          <h2 className="mt-5">Export CSV</h2>
          <p>This CSV contains all the users in the system, whether they have signed up or not, their group and preferences.</p>
          <div className="mt-4 mb-5">
            <Button onClick={getUsersExport}>Download Users CSV</Button>
          </div>
        </div>
      </AdminPageWrapper>
    </LoggedInPageWrapper>
  )
}

export default AdminUsersIndex
