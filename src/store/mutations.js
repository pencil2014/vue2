import * as types from './types'

export default {
  // 修改登录状态
  [types.LOGIN_STATUS] (state, status) {
    state.loginStatus = status
  }
}