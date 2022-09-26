<template>
  <!-- pagination -->
  <nav aria-label="Page navigation" style="margin-top: 10px">
    <ul class="pagination">
      <!-- 첫 페이지라면 숨김 -->
      <li class="page-item" v-if="page !== 1">
        <a
          class="page-link"
          @click="getTodo(page - 1)"
          style="cursor: pointer"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- page link -->
      <li
        class="page-item"
        v-for="index in totalpage"
        :key="index"
        :class="page === index ? 'active' : ''"
      >
        <a class="page-link" style="cursor: pointer" @click="getTodo(index)">{{
          index
        }}</a>
      </li>
      <!-- 마지막 페이지라면 숨김 -->
      <li class="page-item" v-if="page !== totalpage">
        <a
          class="page-link"
          @click="getTodo(page + 1)"
          style="cursor: pointer"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["page", "totalpage"],
  setup(props, { emit }) {
    const getTodo = (page) => {
      emit("get-Todo", page);
    };
    return {
      getTodo,
    };
  },
};
</script>

<style></style>
