<template>
    <div>
        <router-view></router-view>
        <FlashMessage :position="'right bottom'"></FlashMessage>
    </div>
</template>

<script>
export default {
    created(){
        document.querySelector('body').style.backgroundColor = '#343a40'
    }
}
</script>