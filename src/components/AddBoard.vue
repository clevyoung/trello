<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <a
          href
          class="modal-default-button"
          @click.prevent="SET_IS_ADD_BOARD(false)"
        >&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="inputBoardName" />
      </form>
    </div>
    <div slot="footer">
      <button
        class="btn"
        type="submit"
        form="add-board-form"
        :class="{'btn-success' : checkBoardName}"
        :disabled="!checkBoardName"
      >Create Board</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      inputBoardName: ""
    };
  },
  computed: {
    checkBoardName() {
      return !!this.inputBoardName.trim().length;
    }
  },
  components: {
    Modal
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    ...mapActions(["CREATE_BOARD"]),
    addBoard() {
      this.CREATE_BOARD({ title: this.inputBoardName }).finally(() => {
        this.SET_IS_ADD_BOARD(false);

        //finally와 then의 차이점!!!!!!!!!
        //mapstate를 부를 떄와 mapNutation을 부를 떄
      });
    }
  }
};
</script>

<style>
</style>
