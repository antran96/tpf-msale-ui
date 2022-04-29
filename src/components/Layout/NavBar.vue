<template>
  <div class="navbar">
    <silk-layout width="100%" height="100%" class-name="navbar" />

    <div class="hamburger-container" :class="{ 'sidebar': sidebar }" @click="toggleClick">
      <svg-icon icon-class="hamburger" :class="[{ 'is-active': sidebar }, 'hamburger']" />
    </div>

    <div class="page-title">
      <span>{{ page }}</span>
    </div>
    
    <div class="right-menu">
      <div class="right-menu-func">
        
        <el-tooltip class="item" effect="dark" :content="isFullscreen ? 'exit' : 'Full Screen'" placement="bottom">
          <svg-icon :icon-class="isFullscreen ? 'min-arrows' : 'max-arrows'" class-name="right-menu-func--svg" @click="fnFullScreen" />
        </el-tooltip>
      </div>
      
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-tooltip class="item" effect="dark" :content="user.user_name || user.username" placement="bottom">
            <svg-icon :icon-class="user.optional && user.optional.avatar ? user.optional.avatar : 'penguin1'" class-name="avatar-user"/>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Online" placement="bottom">
            <div class="avatar-container--status online"></div>
          </el-tooltip>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/me">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="$store.dispatch('user/logout')">Logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import screenfull from 'screenfull'
// import version from '@/utils/release-notes'

export default {
  data() {
    return {
      // version: version.version,
      device: 'pc',
      isActive: true,
      user: {},
      page: '',
      isFullscreen: false,
      socket: undefined
    }
  },
  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.destroy()
  },

  computed: {
    sidebar() {
      return this.state.app.sidebar
    }
  },

  watch: {
    $route (to, from) {
      this.page = to.name
    }
  },

  created() {
    // this.$store.dispatch('common/fnSocket')
    this.page = this.$route.name
    this.user = this.fnCookie().getInforUser()
    if(!this.user){
      this.user = {}
    }
  },

  methods: {
    fnAwait() {
      // const socket = io.connect(`https://fico-portaltest.tpb.vn/chat`, {
      //   reconnectionAttempts: 5,
      //   reconnectionDelayMax: 10000,
      //   transports: ['websocket'],
      //   path: '/long/socket.io',
      //   query: {
      //       token: "d97dd23d-8a4e-4b3b-b19e-8ad68aadb3b0"
      //   }
      // })

      // socket.on('connect', function () {
      //     console.log('connect')
      // });
      // socket.on('event', function (data) {
      //     console.log('event')
      // });
      // socket.on('disconnect', function () {
      //     console.log('disconnect')
      // });
      // socket.on('sendMess', function (mes) {
      //     console.log(mes)
      // });
      // this.socket = socket
      this.$store.dispatch('common/fnSocket')
      console.log('await')
    },
    fnSleep() {
      this.socket.emit('chat', 'hello')
      console.log('sleep')
    },
    fnFullScreen() {
      if (!screenfull.isEnabled) {
        this.$showMess("warning", "Your browser is not support");
        return false
      }
      screenfull.toggle()
    },

    change() {
      this.isFullscreen = screenfull.isFullscreen
    },

    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },

    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },

    toggleClick() {
      this.state.app.sidebar = !this.state.app.sidebar
      this.fnCookie().setInforApp(this.state.app.sidebar)
    },

    showUserOnline() {
      this.state.app.rightPanel = !this.state.app.rightPanel
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 48px;
    overflow: hidden;
    position: relative;
    background-color: white;
    border-bottom: 1px solid #DCDFE6;

    .hamburger-container {
      height: 100%;
      float: left;
      z-index: 1;
      cursor: pointer;
      .hamburger.is-active {
        transform: rotate(360deg);
      }
      .hamburger {
        transform: rotate(180deg);
      }
      svg {
        height: 20px;
        width: 20px;
        margin: 13px 15px;
      }
      &:hover {
        background: rgba(89, 44, 124, 0.25)
      }
    }

    .right-menu {
      z-index: 1;
      float: right;
      .avatar-container {
        &--status {
          height: 10px;
          width: 10px;
          position: absolute;
          bottom: 5px;
          right: 12px;
          border-radius: 50%;
          &.online {
            background-color: green;
          }
          &.offline {
            background-color: gray;
          }
          &.await {
            background-color: red;
          }
          &.sleep {
            background-color: black;
          }
        }
        .avatar-wrapper {
          cursor: pointer;
          &:hover {
            transform: scale(1.1, 1.1);
            filter: contrast(130%);
          }
          svg {
            height: 40px;
            width: 40px;
            margin: 3px 10px 3px 0;
            position: relative;
          }
          span {
            float: left;
            height: 47px;
            line-height: 47px;
            margin-left: 10px;
            color: #FFF;
            font-weight: 600;
          }
        }
      }
      &-func {
        float: left;
        &--svg {
          height: 20px;
          width: 20px;
          margin: 12px 13px 12px 4px;
          cursor: pointer;
          fill: #f1f1f1;
          &:hover {
            transform: scale(1.1, 1.1);
            filter: contrast(130%);
          }
        }
        &--version {
          float: left;
          margin: 11px 13px 12px 4px;
          height: 22px;
          line-height: 22px;
          background-color: white;
          border-radius: 11px;
          padding: 1px 16px;
          color: var(--clForm80);
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .page-title {
      z-index: 0;
      text-align: center;
      height: 47px;
      line-height: 47px;
      width: 100%;
      margin: auto;
      position: absolute;
      span {
        font-size: 19px;
        font-weight: bold;
        // color: var(--clForm100);
        color: rgb(124 77 245);
      }
    }
  }
  
</style>
