<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="(item, i) in boards" :key="i" :data-bgColor="item.bgColor">
        <router-link :to="`/board/${item.id}`">
          <div class="board-item-title">{{item.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href @click.prevent="SET_IS_ADD_BOARD(true)">Create new board...</a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AddBoard from "./AddBoard";
export default {
  data() {
    return {};
  },
  components: {
    AddBoard
  },
  created() {
    this.fetchData();
  },
  updated() {
    //updated훅 => 돔에 접근 가능
    Array.from(document.querySelectorAll(".board-item")).forEach(el => {
      el.style.backgroundColor = el.dataset.bgColor || "#ddd"; //넘어온 데이터에서 bgColor가 없으면 #ddd 색상 적용
    });
  },
  computed: {
    ...mapState({ boards: "boards", isAddBoard: "isAddBoard" })
  },
  methods: {
    ...mapActions(["FETCH_BOARDS"]),
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    fetchData() {
      //fetch data
      this.FETCH_BOARDS();
    }
  }
};

//
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item-new {
  background-color: #ddd;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
