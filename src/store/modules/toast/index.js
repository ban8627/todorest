export default {
  namespaced: true,
  state: {
    // toastBox 관련 배열로 저장
    toasts: [],
    showToast: false,
  },
  actions: {
    triggerToast({ commit }, { message, color }) {
      // 메세지 및 색상 업데이트
      commit("ADD_TOAST", { message, color });
      // 상태 업데이트
      commit("UPDATE_TOAST_STATE", true);
      // 타이머 업데이트
      setTimeout(() => {
        // 목록(toasts)에서 0번 자리 삭제
        commit("REMOVE_TOAST");
      }, 3000);
    },
  },
  mutations: {
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
    UPDATE_TOAST_STATE(state, payload) {
      state.showToast = payload;
    },
  },
};
