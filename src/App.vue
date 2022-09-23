<template>
  <div class="container">
    <h2>Todo List</h2>
    <!-- 할 일 검색 폼 -->
    <input
      type="text"
      class="form-control"
      v-model="searchText"
      placeholder="Search"
    />
    <!-- 할 일 입력 -->
    <TodoForm @add-todo="addTodo" />
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할 일 목록 -->
    <TodoList
      :todos="filterTodos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
  </div>
</template>
<script>
import { ref, computed } from "vue";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
export default {
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const todos = ref([
      { id: 1, subject: "할일목록 1", complete: false },
      { id: 2, subject: "할일목록 2", complete: false },
      { id: 3, subject: "할일목록 3", complete: false },
    ]);
    const addTodo = (todo) => {
      todos.value.push(todo);
    };
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };
    const toggleTodo = (index) => {
      todos.value[index].complete = !todos.value[index].complete;
    };
    const searchText = ref("");
    const filterTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });
    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
    };
  },
};
</script>
<style>
#app {
}
.todostyle {
  text-decoration: line-through;
  color: gray;
}
</style>
