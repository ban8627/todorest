<template>
  <div class="modal-wrap">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="onClose"
          >
            Close
          </button>
          <button type="button" class="btn btn-danger" @click="onDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-modal", "delete-list"],
  setup(props, { emit }) {
    const onClose = () => {
      emit("close-modal", {});
    };
    const onDelete = () => {
      emit("delete-list", {});
    };
    return {
      onClose,
      onDelete,
    };
  },
};
</script>

<style scoped>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
}
</style>
