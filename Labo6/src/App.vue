

<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <div class="container">
      <div v-for="cast in forecast" :key="cast.valid_date">
        <div>
          <img 
              :src="`https://www.weatherbit.io/static/img/icons/${cast.weather.icon}.png`"
          />
          <div>
            {{ toDayOfWeek(cast.valid_date) }}
          </div>
          <div>
            {{ toLocaleDate(cast.valid_date) }}
          </div>
          <div>
            {{ cast.temp }} C
          </div>
          <div>
            {{ cast.weather.description }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, computed } from 'vue';
import dayjs from "dayjs" ;
import "dayjs/locale/fr";
import { useWeatherAppStore } from '@/store/store';
import HeaderComponent from '@/components/HeaderComponent.vue';

const store = useWeatherAppStore();

const forecast = computed(() => store.forecast);

function toDayOfWeek(date) {
  return dayjs(date).locale("fr").format("ddd");
}

function toLocaleDate(date){
  return dayjs(date).locale("fr").format("DD/MM");
}

  onMounted(() => {
    store.getForecast();
  })


</script>


<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 5rem;
  margin: 0 7rem 0 7rem;
}

</style>
