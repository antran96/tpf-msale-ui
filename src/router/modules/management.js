import Layout from '@/components/Layout'

const router = {
  path: '/management',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Management',
  meta: { title: 'Management', icon: 'user-team' },
  children: [
    {
      path: 'permissions',
      component: () => import('@/views/Management/Permissions'),
      name: 'Permissions',
      meta: { title: 'Permissions', icon: 'scope', roles: '' }
    },
    {
      path: 'users',
      component: () => import('@/views/Management/Users'),
      name: 'Users',
      meta: { title: 'Users', icon: 'user-team', roles: '' }
    }
  ]
}

export default router
