<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'Home' }"
        >It`s My Todos</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              class="nav-link active"
              aria-current="page"
              :to="{ name: 'Home' }"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Todos' }"
              >Todos</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Create' }"
              >Create</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'About' }"
              >About</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Profile' }"
              >Profile</RouterLink
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://github.com/ban8627/todorest.git"
              target="_blank"
              >GitHub</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView
    @update-todo-toast="updateTodoToast"
    @new-todo-toast="newTodoToast"
    @update-load-fail-toast="updateLoadFailToast"
    @update-todo-fail-toast="updateTodoFailToast"
    @err-subject-toast="errSubjectToast"
    @new-todo-fail-toast="newTodoFailToast"
    @list-load-fail-toast="listLoadFailToast"
    @delete-todo-toast="deleteTodoToast"
    @delete-todo-fail-toast="deleteTodoFailToast"
  />
  <Transition name="fade"
    ><ToastBox v-if="showToast" :message="toastMessage" :color="toastType" />
  </Transition>
</template>
<script>
import ToastBox from "@/components/ToastBox.vue";
import { useToast } from "@/composables/toast";
export default {
  components: {
    ToastBox,
  },
  setup() {
    const updateTodoToast = () => {
      triggerToast("내용 업데이트 성공!");
    };
    const newTodoToast = () => {
      triggerToast("새글 작성 완료!");
    };
    const updateLoadFailToast = () => {
      triggerToast(
        "내용을 가지고 오는데 실패하였습니다. 잠시 뒤 다시 시도해 주세요.",
        "danger"
      );
    };
    const updateTodoFailToast = () => {
      triggerToast(
        "수정에실패하였습니다. 잠시 뒤 다시 시도해 주세요.",
        "danger"
      );
    };
    const newTodoFailToast = () => {
      triggerToast(
        "등록에 실패하였습니다. 잠시 뒤 다시 시도해 주세요.",
        "danger"
      );
    };
    const errSubjectToast = () => {
      triggerToast("제목을 입력해주세요!", "danger");
    };
    const listLoadFailToast = () => {
      triggerToast(
        "목록 호출에 실패하였습니다. 잠시 뒤 다시 시도해 주세요.",
        "danger"
      );
    };
    const deleteTodoToast = () => {
      triggerToast("삭제에 성공하였습니다!");
    };
    const deleteTodoFailToast = () => {
      triggerToast(
        "삭제에 실패하였습니다. 잠시 뒤 다시 시도해 주세요.",
        "danger"
      );
    };

    const { showToast, toastMessage, toastType, triggerToast } = useToast();
    return {
      updateTodoToast,
      newTodoToast,
      updateLoadFailToast,
      updateTodoFailToast,
      errSubjectToast,
      newTodoFailToast,
      listLoadFailToast,
      deleteTodoToast,
      deleteTodoFailToast,
      toastMessage,
      showToast,
      toastType,
      triggerToast,
    };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
