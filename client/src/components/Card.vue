<template>
<div class ="itemcard">
  <div class="card">
  <div class="card-image">
    <figure class="image is-4by4">
      <img v-bind:src=item.pic_url  alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
      <!-- <div class="content"> -->
        <p class="title is-4">{{item.item_name}}</p>
      <!-- </div> -->

        <p class="title is-6">{{item.item_description}}</p>

        <div v-if="this.currentUser!==null">
        Item Count:
        <input v-model="total" type="number" class="input is-small" value=1>
        </div>
        
      Rp. {{item.item_price}},00 

        <br><br>
        <button v-if="this.currentUser!==null" @click="addToCart(item)" class="button">Add to Cart</button>
        <button @click="deleteItem(item)" v-if="this.username=='admin'" class="button is-danger">Delete Item</button>

  </div>
</div>

</div>


</template>

<script>
import { mapActions, mapState} from 'vuex'

export default {
  created:function(){
    this.getUsername()
  },
  data:function(){
    return{
      total : 1,
      modalCart:[],
      currentUser:localStorage.getItem('userId')
    }
  },
  props:['item'],
  computed:{
    ...mapState([
      'username',
     
    ])
  },
  methods:{
    addToCart(item){
      console.log("ITEM PRICe",item.item_price)
      this.$store.dispatch('addTocart',{
        itemid:item._id,
        item_name:item.item_name,
        item_price:item.item_price,
        item_description:item.item_description,
        pic_url:item.pic_url,
        total : Number(this.total)
      })
      setTimeout(() => {
        this.getCart()
        this.filterCart()
      }, 200);
    },
    deleteItem(item){
      axios.delete(`http://localhost:7000/item/delete/${item._id}`)
      .then(({data})=>{
        console.log(data)
      })
      .catch(err=>{
        console.log(err)
      })
      setTimeout(() => {
        this.showAllItems()
      }, 200);
    },
    ...mapActions([
      'getCart',
      'filterCart',
      'getUsername',
      'showAllItems'
    ])
  }
}
</script>


<style scoped>

.itemcard{
    padding-top: 30px;
}


</style>