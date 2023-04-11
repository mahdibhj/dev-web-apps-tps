import { Toast } from './toast.js';

const toastButtons = [...document.getElementsByClassName('toast-button')];
const toastInput = document.getElementById('toast-input');

toastButtons.forEach((button) => {
    console.log(button);
    button.addEventListener('click', (event) => {
        if (toastInput.value.length !== 0) {
            console.log(toastInput.value.length)
            const toast = new Toast(
                event.target.dataset.type,
                toastInput.value,
                document.getElementById('toast-container')
            );
            console.log('toast 2')
            toast.toast();
        }
    });
})



const endpoint = "https://umovie.com/movies/1";

const insertMovieDataInHtmlAfterFetch = async function(id) {
    const req = new Request(
        endpoint, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const res = await fetch(req);
    var movieOne = document.getElementById('movie1');
    movieOne.innerText = res;
};