<template>
  <!-- <div>
    {{ name }}
    <br />
    <button class="btn btn-primary" @click="updateName">변경</button>
    <br />
    {{ age.age }}
    <br />
    <button class="btn btn-danger" @click="updateAge">나이</button>
  </div>
  <hr />
  <input :type="text" :value="name" /> -->
  <!-- <div>
    <input type="text" v-model="name" />
    <button class="btn btn-primary" @click="onSubmit">업데이트</button>
  </div> -->
  <div class="conatiner">
    <h2>Todo List</h2>
    <form action="" @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input
            type="text"
            class="form-control"
            v-model="todo"
            placeholder="Type New Todo"
          />
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <div v-show="hasError">내용을 기재해 주쇼.</div>
    </form>
    <div v-if="!todos.length">추가된 할 일 없쇼.</div>
    <div v-for="(item, index) in todos" :key="index" class="card mt-2">
      <div class="card-body p-2 d-flex">
        <div class="form-check flex-grow-1 align-items-center">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="item.complete"
          />
          <label class="form-check-label" :class="{ todostyle: item.complete }"
            >{{ item.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-small" @click="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    // const name = ref("홍길동");    // name.value = "고길동";    // const updateName = () => {    //   name.value = "박길동";    // };
    // const age = reactive({    //   age: 30,    // });
    // const updateAge = () => {    //   age.age = 33;    // };
    // const name = ref("홍길동");
    // const onSubmit = () => { // };
    const hasError = ref(false);
    const todo = ref("");
    const todos = ref([]);
    const onSubmit = () => {
      if (todo.value == "") {
        hasError.value = true;
      } else {
        hasError.value = false;
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          complete: false,
        });
      }
      todo.value = "";
    };
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };
    return {
      // name,      // age,      // updateName,      // updateAge,      // onSubmit,
      todo,
      todos,
      onSubmit,
      hasError,
      deleteTodo,
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
