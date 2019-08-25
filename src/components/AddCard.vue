<template>
  <div class="add-card">
    <form @submit.prevent="onAddCard">
      <input class="form-control" type="text" v-model="inputCardTitle" ref="inputCardTitle" />
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <!-- close이벤트를  부모에게 전달 -->
      <a class="cancel-add-btn" href @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["listId", "pos"],
  data() {
    return {
      inputCardTitle: ""
    };
  },
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim();
    }
  },
  mounted() {
    this.$refs.inputCardTitle.focus();
    this.setupClickOutside(this.$el);
    //부모 컴포넌트에 마운트되서 보여질 때 돔처리
  },
  methods: {
    ...mapActions(["CREATE_CARD"]),
    onAddCard() {
      if (this.invalidInput) return;
      const { inputCardTitle, listId } = this;
      const pos = this.newCardPos();
      this.CREATE_CARD({ title: inputCardTitle, listId, pos }).finally(_ => {
        this.inputCardTitle = "";
      });
    },
    newCardPos() {
      const curList = this.$store.state.board.lists.filter(
        l => l.id === this.listId
      )[0];
      if (!curList) return 65535;
      const { cards } = curList;
      if (!cards.length) return 65535;
      return cards[cards.length - 1].pos * 2;
    },
    onCancelAdd() {},
    setupClickOutside(el) {
      document.querySelector("body").addEventListener("click", e => {
        if (el.contains(e.target) || e.target.className == "add-card-btn")
          return;
        this.$emit("close");
      });
    }
  }
};
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
