import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts:'',
    cartsFiltered:'',
    showCases:'',
    username :''
  },
  mutations: {
    eachCart(state,payload){
      state.carts=payload
    },
    cartsFiltereed(state,payload){
      state.cartsFiltered=payload
    },
    showCase(state,payload){
      state.showCases=payload
    },
    getUser(state,user){
      state.username=user
    }
  },
  actions: {
    getUsername({commit}){
        var username = localStorage.getItem('username')
        commit('getUser',username)
    },
    getCart({commit}){
      let userid = localStorage.getItem('userId')
      axios.get(`http://localhost:7000/cart/${userid}`)
      .then(({data})=>{
        console.log("DATAAA",data.items)
        commit('eachCart',data.items)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    filterCart({commit},payload){
      console.log('masuk filter cart gaaa',payload)
      var cartsData = payload
      var cartArray=[]

      console.log("CARTSDATA di FILTERCART",cartsData)

      if(payload==undefined){
        return ''
      }else{
          function filteringCart(){
            while(cartsData.length>0){
              var newObj={}
              var filteredCart = cartsData.filter(function(cart){
                return cart._id===cartsData[0]._id
              })
              const totalAmount = filteredCart.reduce(function (x, y) {
                x.total += y.total;
                return x 
              });
           
              const totalPrice = totalAmount.total*cartsData[0].item_price

              console.log("COBA DEH SIAPA TAU",totalPrice.item_price)
              
              console.log(totalAmount.total)

              newObj['itemId']=cartsData[0]._id
              newObj['name']=cartsData[0].item_name
              newObj['price']=totalPrice
              newObj['description']=cartsData[0].item_description
              newObj['picurl']=cartsData[0].pic_url
              newObj['amount']=totalAmount.total

              cartArray.push(newObj)
              console.log("New OBJect",newObj)
              console.log("CARTSDATa",cartsData)
              
              cartsData=cartsData.filter(function(a){
                return a._id!==cartsData[0]._id
              })

            }
            commit('cartsFiltereed',cartArray)
          }
          filteringCart()
      }
        
    },
    addTocart({commit},objItem){
      var userid=localStorage.getItem('userId')
      axios.post(`http://localhost:7000/cart/add/${userid}`,{
        itemid:objItem.itemid,
        item_name:objItem.item_name,
        item_price:objItem.item_price,
        item_description:objItem.item_description,
        pic_url:objItem.pic_url,
        total : objItem.total
      })
      .then(({data})=>{
        setTimeout(function(){ 
          swal('berhasil add to cart')
        }, 100);
        setTimeout(function(){ 
          window.location.reload()
        }, 3000);
        
        // alert('berhasil tambah ke cart')
        // console.log("itemprice objitem",objItem.item_price)
      })
      .catch(err=>{ 
        console.log(err)
      }) 
    },
    showAllItems({commit}){
      axios.get('http://localhost:7000/item/get')
      .then(items=>{
        console.log("ITEMS",items)
        commit('showCase',items.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
})
