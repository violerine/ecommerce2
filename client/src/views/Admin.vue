<template>
<div id="admin">
<Navbar/>

<!--CONTENT-->
<div class="content">

Item name : 
<div class="field container">
  <div class="control">
    <input v-model="item_name" class="input is-danger" type="text" placeholder="Item name">
  </div>
</div>


Item Description: 
<div class="field container">
  <div class="control">
    <input v-model="item_description" class="input is-danger" type="text" placeholder="Description">
  </div>
</div>
Item Price : 
<div class="field container">
  <div class="control">
    <input v-model="item_price" class="input is-danger" type="number" placeholder="Price">
  </div>
</div>
        <!--FILE UPLOAD-->

            <div class="file has-name container">
                <label class="file-label">
                    <input  @change="previewFile" class="file-input" type="file" name="resume">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span class="file-name">
                    {{this.filename}}
                    
                    </span>
                    <button @click="uploadPic" type="button" class="button">Upload</button>
                </label>
                <div id="output"></div>
            </div>
            

        <!--FILE UPLOAD END-->
<button @click="addNewItem" type="button" class="button is-danger">Submit</button>

</div>
<!--CONTENT END-->

</div>
</template>


<script>

import Navbar from '@/components/Navbar.vue'
import { loadProgressBar } from 'axios-progress-bar'

export default {
  name: 'admin',
  data:function(){
      return{
          formdata : new FormData(),
          filename:'',
          picurl:'',
          item_name:'',
          item_price:'',
          item_description:''
      }
  },
  components: {
    Navbar,
  },
  methods:{
      previewFile(file){
          console.log({Event})
          var filedata = file.target.files[0]
          this.filename = filedata.name
          this.formdata.append('image',filedata)    
      },
      uploadPic(){
           const config = {
                // headers: { 'content-type': 'multipart/form-data' },
                onUploadProgress: function(progressEvent) {
                    var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log(percentCompleted)
                    document.getElementById('output').innerHTML = percentCompleted;
                }
            }
            axios.post("http://localhost:7000/item/upload",this.formdata,config)
            .then(({data})=>{
                console.log("masukkkk ga disini")
                console.log("data",data)
                if(data!==undefined){
                    swal("berhasil upload foto dulu")
                }
                console.log("LINK IMAGE",data.link)  
                this.picurl=data.link
            })
            .catch(err=>{
                console.log('errorzzzz')
                console.log(err)
            })
      },
        addNewItem(){
        axios.post("http://localhost:7000/item/add",{
            item_name:this.item_name,
            item_price:this.item_price,
            item_description:this.item_description,
            pic_url:this.picurl})
        .then(({data})=>{
            console.log("ini data setelah add new item",data)
            swal("New item added")
            this.item_name=''
            this.item_price=''
            this.item_description=''
        })
        .catch(err=>{
            console.log(err)
        })
     },

  }
}
</script>

<style>
.content{
    padding-top: 40px;
}

</style>



