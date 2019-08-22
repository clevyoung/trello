<template>
  <div class="add-card">
    <form @submit.prevent="onAddCard">
      <input class="form-control" type="text" v-model="inputCardTitle" ref="inputCardTitle"/>
      <button class="btn btn-success" type="submit" :disabled="!checkCardTitle">Add Card</button>
      <!-- close이벤트 방출 -->
      <a class="cancel-add-btn" href @click.prevent="$emit('close')" >&times;</a> 
      
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default{
  props:["listId", "pos"],
  data(){
    return{
      inputCardTitle:""
    }
  },
  computed : {
    checkCardTitle(){
      return !!this.inputCardTitle.trim().length
    }
  },
  mounted(){
    this.$refs.inputCardTitle.focus();
  },
  methods:{
    ...mapActions(['CREATE_CARD']),
    onAddCard(){
      const {inputCardTitle, listId, pos} = this;
     this.CREATE_CARD({title: inputCardTitle, listId, pos}).finally((_) => {
       this.inputCardTitle = ""
     })
    },
    onCancelAdd(){

    }
  }
}
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
