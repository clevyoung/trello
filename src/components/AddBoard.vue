<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <a href class="modal-default-button">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form">
        <input class="form-control" type="text" />
      </form>
    </div>
    <div slot="footer">
      <button class="btn" type="submit" form="add-board-form">Create Board</button>
    </div>
  </Modal>
</template>

<script>
</script>

<style>
</style>
