import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getCoordinates } from '@/utils/getCoordinates';
import { weatherApiKey } from '@/config/weatherApiKey';
import { geoLocationApiKey } from '@/config/geoLocationApiKey';


export const useWeatherAppStore = defineStore('forecast', () => {
    const forecast = ref({});
    const city = ref({});

    async function getForecast() {
        const geolocationPosition = await getCoordinates();
        const response = await axios("https://api.weatherbit.io/v2.0/forecast/daily", {
            params: {
                key: weatherApiKey,
                lang: "fr",
                lat: geolocationPosition.coords.latitude,
                lon: geolocationPosition.coords.longitude,
                days: 14,
            }
        });
        forecast.value = response.data.data;
    };

    async function getCityLocation() {
        const locationCity = await getCoordinates();
        const response = await axios("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                key: geoLocationApiKey,
                lating: locationCity.coords.latitude + ", " + locationCity.coords.longitude,
            }
        });
        city.value = response.data.results[7].formatted_address;
    }

    return { forecast, city, getForecast, getCityLocation }
});