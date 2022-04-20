import Layout from '@/components/Layout'

const router = {
  path: '/admin',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Admin',
  meta: { title: 'Admin', icon: 'admin-setting' },
  children: [
    {
      path: 'client',
      component: () => import('@/views/Admin/Client'),
      name: 'Admin - Client',
      meta: { title: 'Client', icon: 'scope', roles: 'Client_View' }
    },
    {
      path: 'account',
      component: () => import('@/views/Admin/Account'),
      name: 'Admin - Account',
      meta: { title: 'Account', icon: 'user', roles: 'Account_View' }
    }
  ]
}

export default router
