<template>
   <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
                    <div class="card-body">
                        <form @submit.prevent="registerUser">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <input class="form-control" id="inputFirstName" v-model="user.name" type="text" placeholder="Enter your first name">
                                        <label for="inputFirstName">Name</label>
                                        <div class="invalid-feedback" :v-if="errors.name">{{errors.name}}</div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputEmail" type="email" v-model="user.email" placeholder="name@example.com">
                                        <label for="inputEmail">Email address</label>
                                        <div class="invalid-feedback" :v-if="errors.email">{{errors.email}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <input class="form-control" id="inputPassword" v-model="user.password" type="password" placeholder="Create a password">
                                        <label for="inputPassword">Password</label>
                                        <div class="invalid-feedback" :v-if="errors.password">{{errors.password}}</div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3 mb-md-0">
                                        <input class="form-control" id="inputPasswordConfirm" v-model="user.password_confirmation" type="password" placeholder="Confirm password">
                                        <label for="inputPasswordConfirm">Confirm Password</label>
                                        <div class="invalid-feedback" :v-if="errors.password_confirmation">{{errors.password_confirmation}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 mb-0">
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-block" >Create Account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center py-3">
                        <div class="small">
                            <router-link to="/login">Have an account? Go to login</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as AuthService from './../../services/auth_service';
export default {
    name:"Register",
       data(){
        return{
            url: "register",
            user:{
                name:'',
                email:'',
                password:'',
                password_confirmation:''
            },
            errors:{}
        }
    },
    methods :{
        registerUser: async function(){
            console.log(this.user)
            try {
                const res = await AuthService.register(this.url,this.user);
                this.errors={};
                this.$router.push("login");
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
        }
    }
}
</script>