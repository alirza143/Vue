<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-floating mb-3">
                                <input class="form-control" id="email" v-model="user.email" type="email" placeholder="name@example.com" />
                                <label for="email">Email address</label>
                                <div class="invalid-feedback" v-if="errors.email">{{errors.email}}</div>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="password" v-model="user.password" type="password" placeholder="Password" />
                                <label for="password">Password</label>
                                <div class="invalid-feedback" v-if="errors.password">{{errors.password}}</div>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" id="remember_me" v-model="user.remember_me" type="checkbox" value="" />
                                <label class="form-check-label" for="remember_me">Remember Password</label>
                                <div class="invalid-feedback" v-if="errors.remember_me">{{errors.remember_me}}</div>
                            </div>
                            <div class="mt-4 mb-0">
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <router-link class="small" to="/login">Return to login</router-link>
                                <router-link class="btn btn-primary" to="/forgetpassword">Reset Password</router-link>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center py-3">

                        <div class="small"> <router-link to="/register">Need an account? Sign up!</router-link></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as AuthService from './../../services/auth_service'
export default {
    name: "Login",
    data(){
        return {
            url:'login',
            user:{
                email:'',
                password:'',
                remember_me: false
            },
            errors:{}
        }
    },

    methods:{
        login: async function(){
            try {
                const res = await AuthService.login(this.url,this.user)
                this.errors = {};
                this.$router.push("/home")
            } catch(error){
                console.log(error);
                this.flashMessage.error({
                    title: 'Error Getting all categories',
                });

                switch (error){
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
