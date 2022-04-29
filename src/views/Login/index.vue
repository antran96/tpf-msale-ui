<template>
  <div class="login-container">
    <div class="login-page">
      <div class="login-page--bg">
        <silk-layout width="100vw" height="100vh" />
        <img
          style="
            height: 85%;
            margin-top: 1rem;
            margin-left: auto;
            margin-right: auto;
            display: block;
            padding-left: 25rem;
          "
          :src="bgLogin"
        >
      </div>

      <div class="login-page--form">
        <div style="margin-top: calc((70vh - 350px) / 2)">
          <div style="display: flex; justify-content: center">
            <img style="width: 10%; height: 100%" src="icon.png">
            <p style="font-size: 25px; margin-top: auto; margin-bottom: auto">
              TP Fico
            </p>
          </div>
          <el-form
            ref="loginForm"
            :model="state['api'].Login.data"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="title-container">
              <div class="title">
                <p>Welcome to MSale</p>
              </div>
              <p v-if="signUp" class="sub-title">Register your account</p>
              <p v-if="forgotPwd" class="sub-title">Reset your Password</p>
            </div>

            <el-form-item v-if="!forgotPwd" prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="state['api'].Login.data.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-form-item v-if="signUp || forgotPwd" prop="email">
              <span class="svg-container">
                <!-- <svg-icon icon-class="user" /> -->
                <i class="el-icon-message" />
              </span>
              <el-input
                ref="email"
                placeholder="Email"
                name="email"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip v-if="!forgotPwd" v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="state['api'].Login.data.password"
                  placeholder="Password"
                  :type="passwordType"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-form-item>
            </el-tooltip>

            <p
              v-if="login"
              style="
                text-align: right;
                font-size: 13px;
                color: darkgrey;
                margin-right: 20px;
                margin-bottom: 20px;
                cursor: pointer;
              "
              @click="handleForgotPwd"
            >
              Forgot Password?
            </p>

            <div v-if="login" style="display: flex">
              <el-button
                style="background-color: rgb(124 77 245)"
                type="primary"
                class="el-btn"
                @click="handleLogin"
              >
                Login
              </el-button>
              <el-button
                type="primary"
                class="el-btn"
                style="background-color: white"
                @click.native.prevent="handleSignUp"
              >
                Sign up
              </el-button>
            </div>

            <div v-if="signUp" style="display: flex">
              <el-button round icon="el-icon-back" @click="backToLogin" />
              <el-button
                type="primary"
                class="el-btn"
                style="background-color: rgb(124 77 245)"
                @click="handleRegister"
              >
                Register
              </el-button>
            </div>

            <div v-if="forgotPwd" style="display: flex">
              <el-button round icon="el-icon-back" @click="backToLogin" />
              <el-button
                type="primary"
                class="el-btn"
                style="background-color: rgb(124 77 245)"
                @click="handleSend"
              >
                Send
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgLogin from '@/assets/images/bgLogin6.png'
export default {
  name: 'Login',

  data() {
    return {
      model: { root: 'user', state: 'Login' },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      bgLogin: bgLogin,
      signUp: false,
      login: true,
      forgotPwd: false
    }
  },

  created() {
  },

  mounted() {
    if (this.state.api.Login.data.username === '') {
      this.$refs.username.focus()
    } else if (this.state.api.Login.data.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      return this.$refs['loginForm'].validate((valid, mess) => {
        if (valid) {
          return this.$store.dispatch('common/fnRequest', 'Login').then((success) => {
            this.state.api.ProfileUser.params.username = this.state.api.Login.data.username
            this.$refs['loginForm'].resetFields()
            this.$router.push({ path: '/dashboard' })
            return this.$store.dispatch('common/fnRequest', 'ProfileUser')
          })
        } else {
          this.state.app.confirm.open({ message: '<span class="txtNotice">' + mess[Object.keys(mess)[0]][0].message + '</span>' })
          // this.$showMess('error', message)
          return false
        }
      })
    },

    handleSignUp() {
      this.signUp = true
      this.login = false
    },

    handleRegister() {
    },

    handleForgotPwd() {
      this.forgotPwd = true
      this.login = false
    },

    handleSend() {
    },

    backToLogin() {
      this.login = true
      this.signUp = false
      this.forgotPwd = false
    }
  }
}
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;
    input {
      background: #e8eaf6;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 40px;
      caret-color: #ffffff;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px var(--clForm100) inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #e8eaf6;
    background: #e8eaf6;
    border-radius: 30px;
    color: #ffffff;
    margin-bottom: 30px;
  }
  .el-btn {
    width: 100%;
    font-weight: bold;
    padding: 12px 15px;
    font-size: 15px;
    float: right;
    margin-left: 0;
    color: black;
    border: none;
    cursor: pointer;
    border-radius: 30px;
  }
}
</style>

<style lang="scss" scoped>
.login {
  &-footer {
    position: fixed;
    left: 20px;
    bottom: 10px;
    color: #fff;
    line-height: 0.5rem;
  }
  &-container {
    .login-page {
      height: 80vh;
      top: 10vh;
      position: relative;
      width: 80%;
      left: 10%;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 2px 18px 3px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.04);
      &--bg {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #ffffff;
        z-index: 0;
      }
      &--form {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: transparent;
        padding-right: 50%;
        z-index: 2;
        .el-form {
          width: 60%;
          margin: auto;
        }
        .svg-container {
          padding: 6px 5px 6px 15px;
          color: black;
          vertical-align: middle;
          width: 30px;
          display: inline-block;
          line-height: 30px;
        }
        .title-container {
          position: relative;
          text-align: center;
          align-items: center;
          margin-top: 2rem;
          margin-bottom: 2rem;
          .title {
            color: black;
            text-align: center;
            font-weight: bold;
            p:first-child {
              font-size: 1.5rem;
              line-height: 1.5rem;
              font-family: "Comic Sans MS", cursive, sans-serif;
            }
            p:last-child {
              font-size: 2rem;
              line-height: 2rem;
              margin-top: -5px;
            }
          }
        }
        .img-logo {
          display: block;
          width: 7%;
          margin-left: 7rem;
          margin-top: 5rem;
        }
      }
      .show-pwd {
        position: absolute;
        right: 15px;
        top: 7px;
        font-size: 16px;
        color: black;
        cursor: pointer;
        user-select: none;
      }
      .sub-title {
        text-align: left;
        font-size: 15px;
        color: darkgrey;
        margin-right: 20px;
        margin-bottom: 20px;
        padding-left: 15px;
      }
    }
  }
}
</style>
