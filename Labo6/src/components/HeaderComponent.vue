<template>
    <div class="nav-bar">
        <i class="uil uil-map-marker-info"></i>
        <p class="title">{{ city }}</p>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue';
    import { useWeatherAppStore } from '@/store/store';
    
    const store = useWeatherAppStore();

    const city = computed(() => store.city)

    onMounted(() => {
        store.getCityLocation();
    })
</script>

<style>
.nav-bar{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 6rem;
        width: 100vw;
        background: blueviolet;
        top: 0;
    }
    .nav-bar i {
        display: flex;
        align-self: center;
    }
</style>