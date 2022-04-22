<template>
  <div class="login-container">
    <silk-layout width="100vw" height="100vh" />
    <div class="login-page">
      <div class="login-page--bg">
        <el-form class="login-page--form">
          <div>
            <!-- <img src="img_avatar2.png" /> -->
          </div>

          <div>
            <el-form-item prop="username">
              <label><b>Username</b></label>
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip>
              <el-form-item prop="password">
                <label><b>Password</b></label>
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  type="password"
                  ref="password"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                />
                <span class="show-pwd">
                  <!-- <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                /> -->
                  <svg-icon icon-class="eye" />
                </span>
              </el-form-item>
            </el-tooltip>

            <div class="el-btn-login">
              <el-button
                style="background-color: white; color: black"
                type="primary"
                >Login</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    input {
      background-color: #1a237e;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #ffffff;
      height: 40px;
      caret-color: #ffffff;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px var(--clForm100) inset !important;
        -webkit-text-fill-color: #ffffff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid var(--clForm100);
    background: var(--clForm100);
    border-radius: 5px;
    color: #ffffff;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }
  .el-btn-login {
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
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
      height: 60vh;
      top: 25vh;
      position: relative;
      width: 30%;
      left: 35%;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 2px 18px 3px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.04);
      &--bg {
        height: 100%;
        width: 100%;
        background-size: 51%;
        background-repeat: no-repeat;
        background-position: 15px;
        background-color: #7986cb;
        position: absolute;
      }
      &--form {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: rgba(197, 202, 233, 0.4);
        padding-top: 15%;
        // -webkit-clip-path: polygon(100% 100%, 60% 100%, 45% 32%, 55% 0, 100% 0);
        // clip-path: polygon(100% 100%, 60% 100%, 45% 32%, 55% 0, 100% 0);
        // z-index: 2;
        // padding-left: 50%;
        .el-form {
          width: 35%;
          margin: auto;
          background-color: #7986cb;
        }
        .svg-container {
          padding: 6px 5px 6px 15px;
          color: #ffffff;
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
            color: var(--clForm100);
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
        .show-pwd {
          position: absolute;
          right: 10px;
          top: 7px;
          font-size: 16px;
          color: #ffffff;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
</style>