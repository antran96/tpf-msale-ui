import * as cookie from '@/utils/cookie'
import router, { resetRouter } from '@/router'
import { objState } from '@/utils/fn-common'

const state = {
  Login: {
    ...objState,
    url: 'auth/login',
    method: 'post',
    rules: {
      username: [{ required: true, trigger: ['blur', 'change'] }],
      password: [{ required: true, trigger: ['blur', 'change'] }]
    },
    data: {
      password: '',
      username: ''
    }
  },
  Logout: {
    ...objState,
    url: 'logout',
    method: 'get'
  },
  ProfileUser: {
    ...objState,
    url: 'user/getProfile',
    method: 'get',
    params: {
      username: '',
    }
  },
  ListUser: {
    ...objState,
    url: 'user/list',
    method: 'get',
  },
  DetailUser: {
    ...objState,
    url: 'user',
    method: 'get',
    params: {
      id: ''
    }
  },
  CreateUser: {
    ...objState,
    url: 'user/register',
    method: 'post',
    data: {"name":'',"username":'',"email":'',"phone":'',"password":'',"identify":'',"code":'',"gender":'',"doj":'',"address":'',"role":''}
  },
  UpdateStatusUser: {
    ...objState,
    url: 'user/update-status',
    method: 'post',
    data: {
      status: '',
      id: '',
    }
  },
  Dashboard: {
    ...objState,
    url: 'dashboard',
    method: 'get',
    params: {
      limit: '',
      page: ''
    }
  },
  MessageHistory: {
    ...objState,
    url: 'activity/histories',
    method: 'get',
    params: {
      limit: ''
    }
  },
  ListContentType: {
    ...objState,
    url: 'activity/list-content-type',
    method: 'get'
  },
  Subordinates: {
    ...objState,
    url: 'user/get-surbodinates',
    method: 'get',
    params: {
      limit: ''
    }
  },
  SendMessage: {
    ...objState,
    url: 'activity/send',
    method: 'post',
    data: {
      fileUrl: '',
      title: '',
      content: '',
      contentType: '',
      receives: ''
    }
  },
  ListApplication: {
    ...objState,
    url: 'aplication',
    method: 'get',
    params: {
      page: '',
      limit: '',
      tab: ''
    }
  },
  ListTabsApp: {
    ...objState,
    url: 'application/list-tabs',
    method: 'get'
  },
  DocumentApp: {
    ...objState,
    url: 'aplication/document',
    method: 'get'
  },
  MessageApp: {
    ...objState,
    url: 'application/message',
    method: 'get',
    params: {
      limit: ''
    }
  },
  F1Document: {
    ...objState,
    url: 'application/f1-documents',
    method: 'get',
    params: {
      limit: ''
    }
  },
  ListDevice: {
    ...objState,
    url: 'device',
    method: 'get',
    params: {
      limit: '',
      page: ''
    }
  }
}

const mutations = {
}

export default {
  namespaced: true,
  mutations,
  state
}
