<template>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Tables</h1>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                DataTable Example
                <button type="button" class="btn btn-default" @click="addNewCategoryModal">Add</button>
            </div>
            <div class="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cat, index) in categories" :key="index">
                            <td>{{cat.id}}</td>
                            <td>{{cat.name}}</td>
                            <td><img :src="`${$store.state.files}${cat.image}`" :alt="cat.name" width="50" height="50"></td>
                            <td>
                                <button class="btn btn-primary btn-sm" @click="editCategory(cat)"><span class="fa fa-edit"></span></button>
                                <button class="btn btn-danger btn-sm" @click="deleteCategory(cat)"><span class="fa fa-trash"></span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-center" v-show="moreExist">                
                    <button class="btn btn-primary btn-big text-center" @click="loadMore">Load More</button>
                </div>
            </div>
        </div>
        <b-modal ref="newCategoryModal" hide-footer title="Using Component Methods">
            <div class="d-block">
               <form @submit.prevent="createCategory">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" v-model="category.name" class="form-control" id="name">
                        <div class="invalid-feedback" :v-if="errors.name">{{errors.name}}</div>
                    </div>
                    <div v-if="category.image.name">
                        <img src="" ref="categoryImageDispaly" width="50" height="50">
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="file" ref="categoryImageRef" @change="attachImage" class="form-control" id="image">
                        <div class="invalid-feedback" :v-if="errors.image">{{errors.image}}</div>
                    </div>
                    <hr/>
                    <div class="text-right">
                    <button type="button" class="btn btn-default" @click="closeModal">Cancel</button>
                    <button type="submit" class="btn btn-success" >Save</button>
                    </div>
                </form>
            </div>
        </b-modal>
        <b-modal ref="updateCategoryModal" hide-footer title="Using Component Methods">
            <div class="d-block">
               <form @submit.prevent="updateCategory">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" v-model="updateCategoryData.name" class="form-control" id="name">
                        <div class="invalid-feedback" :v-if="errors.name">{{errors.name}}</div>
                    </div>
                    <div v-if="updateCategoryData.image">
                        <img :src="`${$store.state.files}${updateCategoryData.image}`" ref="updateCategoryImageDispaly" width="50" height="50">
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="file" ref="updateCategoryImageRef" @change="updateAttachImage" class="form-control" id="image">
                        <div class="invalid-feedback" :v-if="errors.image">{{errors.image}}</div>
                    </div>
                    <hr/>
                    <div class="text-right">
                    <button type="button" class="btn btn-default" @click="closeUpdataCatagoryModal">Cancel</button>
                    <button type="submit" class="btn btn-success" >Update</button>
                    </div>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import * as categoryService from '../services/categoryService';
export default {
    name:"category",
    data(){
        return {
            url : 'category',
            moreExist: true,
            nextPage: 0,
            category:{
                name:'',
                image:''
            },
            updateCategoryData:{
                 name:'',
                image:''
            },
            categories:[],
            errors:{
            }
        }
    },
    mounted(){
        this.getCategories();
    },
    methods:{
        loadMore:async function (){
            try {
                const res =  await categoryService.getMoreRecords(this.url,this.nextPage);
                 if(res.status == 200){
                    
                    if(res.data.current_page < res.data.last_page){
                        this.moreExist = true;
                        this.nextPage = res.data.current_page + 1;
                    } else {
                         this.moreExist = false;
                    }
                    console.log(this.categories);
                    res.data.data.forEach(data => {
                        this.categories.push(data);
                         console.log(this.categories);
                    })
                }
                
            } catch (error) {
                this.flashMessage.error({
                    title: 'Error Getting all categories',
                });
            }
        },
        editCategory (category){
            this.updateCategoryData = {...category};
            this.$refs.updateCategoryModal.show();
             this.errors = {};
        },
        updateCategory: async function(){
            
            let data = new FormData();
            data.append('name',this.updateCategoryData.name);
            data.append('image',this.updateCategoryData.image);
            data.append('_method','put');
            
            try {
                const res = await categoryService.updateRecords(this.url,this.updateCategoryData.id, data);
                this.categories.map(category => {
                    if(category.id == res.data.id){
                        for(let key in res.data){
                            category[key]=res.data[key];

                        }
                    }
                });
                this.closeUpdataCatagoryModal();
                   this.flashMessage.success({
                        title: 'Success Message Title',
                        message: 'Hoorah, it is my fist npm package and it works!'
                    });
                
            } catch (error) {
                switch (error.response.status){
                    case 422:
                       this.errors =  error.response.data.errors
                       break;
                    default:
                        this.flashMessage.error({
                                title: 'Error Message Title',
                                message: 'Oh, you broke my heart! Shame on you!'
                            });
                        break;
                }
            }
        },
        updateAttachImage(){
            this.updateCategoryData.image = this.$refs.updateCategoryImageRef.files[0];

            let reader =  new FileReader();
            reader.addEventListener('load',function(){
                
                this.$refs.updateCategoryImageDispaly.src = reader.result;
            }.bind(this),false);

            reader.readAsDataURL(this.updateCategoryData.image);
        },

        deleteCategory: async function(category){
            // if(!window.confirm(`Are you sure you want to delete${category.name}`)){
            //     return;
            // }
             try {
                const res = await categoryService.deleteRecords(this.url,category.id);
                 if(res.status == 200){

                     this.categories = this.categories.filter(obj => {
                         return obj.id != category.id
                     })

                    this.flashMessage.success({
                        title: 'Deleted',
                    });
                }
                
            } catch (error) {
                this.flashMessage.error({
                    title: 'Error Deleted categorry',
                });
            }
        },
        attachImage(){
            this.category.image = this.$refs.categoryImageRef.files[0];

            let reader =  new FileReader();
            reader.addEventListener('load',function(){
                this.$refs.categoryImageDispaly.src = reader.result;
            }.bind(this),false);

            reader.readAsDataURL(this.category.image);
        },
        createCategory: async function(){
            let data = new FormData();
            data.append('name',this.category.name);
            data.append('image',this.category.image);
            try {
                const res = await categoryService.createRecord(this.url,data);   
                this.categories.unshift(res.data);       
                if(res.status == 200){
                    this.closeModal();
                   this.flashMessage.success({
                        title: 'Success Message Title',
                        message: 'Hoorah, it is my fist npm package and it works!'
                    });
                }
            } catch (error) {
                switch (error.response.status){
                    case 422:
                       this.errors =  error.response.data.errors
                       break;
                    default:
                        this.flashMessage.error({
                                title: 'Error Message Title',
                                message: 'Oh, you broke my heart! Shame on you!'
                            });
                        break;
                }
            }
        },
        getCategories: async function(){
            try {
                const res =  await categoryService.getAllRecords(this.url);
                 if(res.status == 200){
                    this.categories = res.data.data;  
                    if(res.data.current_page < res.data.last_page){
                        this.moreExist = true;
                        this.nextPage = res.data.current_page + 1;
                    } else {
                         this.moreExist = false;
                    }
                }
                
            } catch (error) {
                this.flashMessage.error({
                    title: 'Error Getting all categories',
                });
            }
        },
        closeModal(){
            this.$refs.newCategoryModal.hide();
             this.errors = {};
        },

        closeUpdataCatagoryModal(){
            this.$refs.updateCategoryModal.hide();
             this.errors = {};
        },

        addNewCategoryModal(){
            this.$refs.newCategoryModal.show();
             this.errors = {};
        }

    }
}
</script>