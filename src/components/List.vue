<template>
  <div class="list">
    <div class="list-header">
      <div class="list-header-title">{{list.title}}</div>
      
      <a class="delete-list-btn" href=""></a>
    </div>

    <div class="card-list">
      <CardItem v-for="card in list.cards" :data="card" :key="card.id"/>
      <div class="empty-card-item"></div>
    </div>
    <div v-if="isAddCard">
      <!-- close이벤트를 받아서 처리 -->
      <AddCard :listId = list.id :pos=list.pos @close="isAddCard=false"/>
    </div>
    <div v-else>
        <a class="add-card-btn" href @click.prevent="onAddCard">&plus; Add a card...</a>
    </div>
    
  </div>
</template>

<script>
import AddCard from "../components/AddCard";
import CardItem from "../components/CardItem"
export default{
  props:['list'],
  data(){
    return{
      isAddCard : false
    }
  },
 
  components:{
    AddCard,
    CardItem
  },
  props : ['list'],

  methods:{
      onAddCard(){
        this.isAddCard = true;  
      }
    }
  }

</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
  min-height: 10px;
}
.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
