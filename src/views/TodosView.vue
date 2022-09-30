<template>
  <div class="container">
    <h2>Todo View</h2>
    <TodoForm
      :editing="true"
      @update-todo="updateTodo"
      @update-load-fail="updateLoadFail"
      @update-todo-fail="updateTodoFail"
      @err-subject="errSubject"
    />
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";
export default {
  components: { TodoForm },
  emits: [
    "update-todo-toast",
    "update-load-fail-toast",
    "update-todo-fail-toast",
    "err-subject-toast",
  ],
  setup(props, { emit }) {
    // 생명 주기 코드(LifeCycle Hooks)
    // 화면에 보여지기전(등록) 단계
    // : 화면을 보여주기 전에 데이터를 준비하는 Hook
    // onBeforeMount(() => {
    // });
    // 화면에 보여지(등록)는 단계
    // onMounted(() => {
    // });
    // 화면이 갱신이 되기 전 단계
    // onBeforeUpdate(() => {
    // });
    // 화면이 갱신이 되고 난 후 단계
    // onUpdated(() => {
    // });
    // 컴포넌트가 화면에서 제거 되기 전 준비 단계
    // : 메모리를 정리하는 곳
    // onBeforeUnmount(() => {
    // });
    // 컴포넌트가 완전히 제거되었을 때
    // onUnmounted(() => {
    //   clearTimeout(toastTimer.value);
    // });
    const updateTodo = () => {
      // console.log("내용 업데이트");
      emit("update-todo-toast", {});
    };
    const updateLoadFail = () => {
      emit("update-load-fail-toast", {});
    };
    const updateTodoFail = () => {
      emit("update-todo-fail-toast", {});
    };
    const errSubject = () => {
      emit("err-subject-toast", {});
    };
    return { updateTodo, updateLoadFail, updateTodoFail, errSubject };
  },
};
</script>

<style></style>
