<template>
  <div class="container">
    <h2>Todo View</h2>
    <div class="loding" v-if="loading">Loding...</div>
    <form v-if="!loading">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>Todo Subject</label>
            <input type="text" class="form-control" v-model="todo.subject" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-gruop">
            <label>Status</label>
            <div>
              <button
                class="btn"
                :class="todo.complete ? 'btn-success' : 'btn-danger'"
              >
                {{ todo.complete ? "Completed" : "Not Yet" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-outline-dark ml-2">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    // data loding window stat
    const loading = ref(true);
    const todo = ref(null);
    // 전달받은 id 이용 db 에서 자료를 가져온다.
    const getTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos/${route.params.id}`
        );
        todo.value = response.data;
        loading.value = false;
      } catch (err) {
        console.log("🚀 ~ file: TodosView.vue ~ line 31 ~ getTodo ~ err", err);
      }
    };
    getTodo();
    return { todo, loading };
  },
};
</script>

<style>
svg {
  width: 100px;
  height: 100px;
  margin: 20px;
  display: inline-block;
}
</style>
