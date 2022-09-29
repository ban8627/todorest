<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-3 mt-3">
      <h2>To Do List</h2>
      <button class="btn btn-primary btn-sm" @click="moveToCreate">
        Create Todo
      </button>
    </div>
    <!-- 할 일 검색 폼 -->
    <input
      type="text"
      class="form-control"
      v-model="searchText"
      placeholder="Search"
    />

    <!-- 서버에러 출력 -->
    <ErrBox :errtext="error" />
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할 일 목록 -->
    <TodoList
      :todos="todos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
    <PaginationView :page="page" :totalpage="totalPage" @get-todo="getTodo" />
    <ToastBox :message="toastMessage" :color="toastType" v-if="showToast" />
  </div>
</template>

<script>
import { ref, computed, watchEffect, watch } from "vue";
import axios from "axios";
import TodoList from "@/components/TodoList.vue";
import PaginationView from "@/components/PaginationView.vue";
import ErrBox from "@/components/ErrorBox.vue";
import ToastBox from "@/components/ToastBox.vue";
import { useToast } from "@/composables/toast";
import { useRouter } from "vue-router";
export default {
  components: {
    TodoList,
    PaginationView,
    ErrBox,
    ToastBox,
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
        triggerToast("목록이 추가 되었습니다.");
      } catch (err) {
        console.log(err);
        error.value = "목록 추가 실패";
        triggerToast("목록 추가 실패되었습니다.", "danger");
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
        triggerToast("삭제되었습니다.");
      } catch (err) {
        console.log(err);
        error.value = "삭제 요청이 거부되었습니다.";
        triggerToast("삭제 요청이 거부되었습니다.", "danger");
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
        triggerToast("업데이트에 성공하였습니다.");
      } catch (err) {
        console.log(err);
        error.value = "업데이트에 실패하였습니다.";
        triggerToast("업데이트에 실패하였습니다.", "danger");
      }
    };
    const searchText = ref("");
    // ref, reactive, computed, props 등 변경될때 마다 실행
    // watchEffect 를 사용함
    watchEffect(() => {});
    // 변하기 전의 값과 현재 값을 동시에 감시
    // 검색어 연속입력 부분 딜레이 강제 입력
    let timeout = null;
    watch(searchText, () => {
      // 일정시간 이후 1번 실행
      // 타이머 삭제
      clearTimeout(timeout);
      // 타이머 생성
      timeout = setTimeout(() => {
        getTodo(1);
      }, 800);
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
          `http://localhost:3000/todos?_page=${nowPage}&_limit=${limit}&subject_like=${searchText.value}&_order=desc&_sort=id`
        );
        todos.value = response.data;
        // 총 목록 수
        totalCount.value = response.headers["x-total-count"];
        page.value = nowPage;
        triggerToast("서버 목록 호출에 성공했습니다.");
      } catch (err) {
        console.log(err);
        error.value = "서버 목록 호출에 실패했습니다. 잠시 뒤 이용해 주세요.";
        triggerToast(
          "서버 목록 호출에 실패했습니다. 잠시 뒤 이용해 주세요.",
          "danger"
        );
      }
    };
    getTodo();
    // 안내창 관련
    const { showToast, toastMessage, toastType, triggerToast } = useToast();
    const router = useRouter();
    const moveToCreate = () => {
      router.push({
        name: "Create",
      });
    };
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
      toastMessage,
      showToast,
      toastType,
      moveToCreate,
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
