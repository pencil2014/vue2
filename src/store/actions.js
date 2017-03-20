import * as types from './types'

export default {
  changeLoginStatus({ commit }, status) {
    commit(types.LOGIN_STATUS, status)
  }
}