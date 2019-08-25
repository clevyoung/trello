<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input class="form-control" type="text" />
          <span class="board-title">{{board.title}}</span>
          <a class="board-header-btn show-menu" href>... Show Menu</a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
              <List :list="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import List from "../components/List.vue";

export default {
  components: {
    List
  },
  data() {
    return {
      dragulaCards: null
    };
  },
  created() {
    this.fetchData().then(_ => {
      //this.inputTitle = this.board.title
    });
  },
  updated() {
    //보드 컴포넌트 내에 자식 컴포넌트가 렌더링 된 후에 설정해줘야함 자식 컴포넌트가 다 마운트된 시점 updated 훅
    if (this.dragulaCards) this.dragulaCards.destroy();
    this.dragulaCards = dragula([
      ...Array.from(this.$el.querySelectorAll(".card-list"))
    ]).on("drop", (el, wrapper, target, siblings) => {
      const targetCard = {
        id: el.dataset.cardId * 1,
        pos: 65535
      };
      //앞 뒤에 어떤 카드가 있는지 확인
      let prevCard = null;
      let nextCard = null;

      Array.from(wrapper.querySelectorAll(".card-item")).forEach(
        (el, idx, arr) => {
          const cardId = el.dataset.cardId * 1;
          if (cardId == targetCard.id) {
            //배열을 순회하면서 prevCard와 nextCard를 찾는 로직
            prevCard =
              idx > 0
                ? {
                    id: arr[idx - 1].dataset.cardId * 1,
                    pos: arr[idx - 1].dataset.cardPos * 1
                  }
                : null;
            nextCard =
              idx < arr.length - 1
                ? {
                    id: arr[idx + 1].dataset.cardId * 1,
                    pos: arr[idx + 1].dataset.cardPos * 1
                  }
                : null;
          }
        }
      );
      //이동했을 때
      if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2;
      else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2;
      else if (prevCard && nextCard)
        targetCard.pos = (prevCard.pos + nextCard.pos) / 2;
      this.UPDATE_CARD(targetCard);
      console.log(targetCard);
    });
  },
  watch: {
    $route() {
      this.fetchData();
    }
  },
  computed: {
    ...mapState({ board: "board" })
  },
  methods: {
    ...mapActions(["FETCH_BOARD", "UPDATE_CARD"]),
    fetchData() {
      return this.FETCH_BOARD(this.$route.params.bid);
    }
  }
};
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}
.board-header input[type="text"] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
