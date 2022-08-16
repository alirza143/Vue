<template>
    <div>
         <Header /> 
        <div id="layoutSidenav">
            <Sidebar />
            <div id="layoutSidenav_content">
                <main>
                    <router-view></router-view>
                </main>
               <Footer />
            </div>
        </div>
        <FlashMessage :position="'right bottom'"></FlashMessage>
    </div>
</template>

<script>
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import Sidebar from './../components/Sidebar.vue';
export default {
    components:{
    Header,
    Footer,
    Sidebar 
}
}
</script>
