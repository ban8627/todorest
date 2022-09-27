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
  <RouterView></RouterView>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style>
#app {
}
</style>
