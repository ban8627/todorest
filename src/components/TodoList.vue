<template>
  <div>
    <div v-for="(item, index) in todos" v-bind:key="index" class="card mt-2">
      <div class="card-body p-2 d-flex">
        <div class="form-check flex-grow-1 align-items-center">
          <input
            type="checkbox"
            class="form-check-input"
            :checked="item.complete"
            @change="toggleTodo(index)"
          />
          <label
            class="form-check-label"
            style="cursor: pointer"
            @click="moveToPage(item.id)"
            v-bind:class="{ todostyle: item.complete }"
            >{{ item.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="openModal(item.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <teleport to="#modal">
      <ModalWin
        v-if="showModal"
        @close-modal="closeModal"
        @delete-list="deleteList"
      >
        <template v-slot:title>할 일 삭제</template>
        <template v-slot:body>정말 삭제하시겠습니까?</template>
      </ModalWin>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ModalWin from "@/components/ModalWin.vue";
export default {
  props: ["todos"],
  // emit 관리하기 편하기 위해
  emits: ["delete-todo", "toggle-todo"],
  components: { ModalWin },
  setup(props, { emit }) {
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };
    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };
    const router = useRouter();
    const moveToPage = (id) => {
      // router 를 이용해서 id 전송
      // router.push(`/todos/${id}`);
      router.push({
        name: "detail",
        params: {
          id,
        },
      });
    };

    // 모달 기능
    const showModal = ref(false);
    const deleteId = ref(null);
    const openModal = (id) => {
      deleteId.value = id;
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const deleteList = () => {
      showModal.value = false;
      deleteTodo(deleteId.value);
    };
    return {
      deleteTodo,
      toggleTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
      deleteList,
    };
  },
};
</script>

<style></style>
