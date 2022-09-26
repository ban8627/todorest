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
    <TodoForm @add-todo="addTodo" style="margin-top: 10px" />
    <!-- 서버에러 출력 -->
    <div style="color: red">{{ error }}</div>
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할 일 목록 -->
    <TodoList
      :todos="filterTodos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
  </div>
  <PaginationView :page="page" :totalpage="totalPage" @get-todo="getTodo" />
</template>
<script>
import { ref, computed, watchEffect, watch } from "vue";
import axios from "axios";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import PaginationView from "./components/PaginationView.vue";
export default {
  components: {
    TodoForm,
    TodoList,
    PaginationView,
  },
  setup() {
    // Pagination 구현
    // All List
    const totalCount = ref(0);
    // Page per View
    const limit = 5;
    // now Page
    const page = ref(1);
    // total Page
    const totalPage = computed(() => {
      return Math.ceil(totalCount.value / limit);
    });

    const todos = ref([]);
    const error = ref("");
    const addTodo = async (todo) => {
      try {
        await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          complete: todo.complete,
          id: todo.id,
        });
        todos.value.push(todo);
        getTodo(1);
      } catch (err) {
        error.value = "목록 추가 실패";
      }
    };
    const deleteTodo = async (index) => {
      try {
        // 현재 index 는 인덱스 번호 0 ~ n 가 전송
        // 실제 저장되어 있는 id 를 파악
        const id = todos.value[index].id;
        await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);
        getTodo(page.value);
      } catch (err) {
        error.value = "삭제 요청이 거부되었습니다.";
      }
    };
    const toggleTodo = async (index) => {
      try {
        // 어느 데이터를 수정할 것인지 전달
        // 업데이트 할 내용을 전달
        const id = todos.value[index].id;
        const complete = !todos.value[index].complete;
        await axios.patch("http://localhost:3000/todos/" + id, {
          complete,
        });
        todos.value[index].complete = complete;
      } catch (err) {
        error.value = "업데이트에 실패하였습니다.";
      }
    };
    const searchText = ref("");
    // ref, reactive, computed, props 등 변경될때 마다 실행
    // watchEffect 를 사용함
    watchEffect(() => {});
    // 변하기 전의 값과 현재 값을 동시에 감시
    watch(searchText, () => {
      // 검색 기능은 추후 보완 예정
      // getTodo(1);
    });
    const filterTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });
    const getTodo = async (nowPage = page.value) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos?_page=${nowPage}&_limit=${limit}`
        );
        todos.value = response.data;
        // 총 목록 수
        totalCount.value = response.headers["x-total-count"];
        page.value = nowPage;
      } catch (err) {
        error.value = "서버 목록 호출에 실패했습니다. 잠시 뒤 이용해 주세요.";
      }
    };
    getTodo();

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
      getTodo,
      totalPage,
      page,
    };
  },
};
</script>
<style>
.todostyle {
  text-decoration: line-through;
  color: gray;
}
</style>
