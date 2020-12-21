import * as $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import '@scss/main.scss'
import 'owl.carousel'

let locations = [
    'ул. Петровско-Разумовская 17',
    'ул. Сибирский проезд 10, к.2',
    'ул. Перервинский бульвар 27, к.1'
];

document.addEventListener('DOMContentLoaded', function(){

    // location input
    let location = document.querySelector('.location');
    let locationForm = document.querySelector('.location-form');
    let inputWrapClose = document.querySelector('.inputwrap__close');

    location.addEventListener('click', function (e) {
        this.style.display = 'none';
        locationForm.style.display = 'block';
    });

    inputWrapClose.addEventListener('click', function (e) {
        this.closest('.header-location').querySelector('.location-form').style.display = 'none';
        this.closest('.header-location').querySelector('.location').style.display = 'block';
    });

    // location input init
    autocomplete(document.getElementById('location'), locations);

});


function autocomplete(inp, arr) {
    let currentFocus;

    inp.addEventListener('input', function(e) {
        let el_AutocompleteList,
            el_htmlAutocompleteListItem,
            el_htmlAutocompleteListItemIcon,
            el_htmlAutocompleteListItemTxt,
            el_htmlAutocompleteListItemInput,
            i, val = this.value;

        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;

        el_AutocompleteList = document.createElement('DIV');
        el_AutocompleteList.setAttribute('id', this.id + '--autocomplete-list');
        el_AutocompleteList.setAttribute('class', 'autocomplete-list');

        this.closest('.autocomplete').appendChild(el_AutocompleteList);

        for (i = 0; i < arr.length; i++) {
            let searchPos = arr[i].toUpperCase().indexOf(val.toUpperCase());
            if (searchPos !== -1) {
                el_htmlAutocompleteListItem = document.createElement('DIV');
                el_htmlAutocompleteListItem.setAttribute('class', 'autocomplete-list__item');

                el_htmlAutocompleteListItemIcon = document.createElement('DIV');
                el_htmlAutocompleteListItemIcon.setAttribute('class', 'autocomplete-list__iconbox');
                el_htmlAutocompleteListItemIcon.innerHTML = '<svg class="autocomplete-list__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 31"> <path d="M15.49 7.73a3.92 3.92 0 00-3.6 2.39 3.85 3.85 0 002.84 5.28 3.93 3.93 0 004-1.65 3.85 3.85 0 00-.48-4.89 3.92 3.92 0 00-2.76-1.13zm0 5.8a1.96 1.96 0 01-1.8-1.19A1.92 1.92 0 0115.1 9.7a1.97 1.97 0 012 .82 1.93 1.93 0 01-.24 2.45c-.37.36-.86.57-1.38.57z"/><path fill="#000" d="M23 4.15A10.65 10.65 0 005 9.95c-.4 2.58.16 5.21 1.6 7.4l7.37 11.23a1.8 1.8 0 002.37.6c.27-.14.49-.35.65-.6l7.38-11.24a10.47 10.47 0 00-1.39-13.2zm-.26 12.13L15.5 27.34 8.24 16.28A8.58 8.58 0 0115.49 3a8.71 8.71 0 016.12 2.52 8.58 8.58 0 011.13 10.76z"/> </svg>';
                el_htmlAutocompleteListItem.appendChild(el_htmlAutocompleteListItemIcon);

                el_htmlAutocompleteListItemTxt = document.createElement('DIV');
                el_htmlAutocompleteListItemTxt.setAttribute('class', 'autocomplete-list__txt');
                el_htmlAutocompleteListItemTxt.innerHTML = arr[i].substring(0, searchPos);
                el_htmlAutocompleteListItemTxt.innerHTML += '<strong>' + arr[i].substring(searchPos, searchPos + val.length) + '</strong>';
                el_htmlAutocompleteListItemTxt.innerHTML += arr[i].substring(searchPos + val.length);
                el_htmlAutocompleteListItem.appendChild(el_htmlAutocompleteListItemTxt);

                el_htmlAutocompleteListItemInput = document.createElement('INPUT');
                el_htmlAutocompleteListItemInput.setAttribute('type', 'hidden');
                el_htmlAutocompleteListItemInput.setAttribute('value', arr[i]);
                el_htmlAutocompleteListItem.appendChild(el_htmlAutocompleteListItemInput);

                el_htmlAutocompleteListItem.addEventListener('click', function(e) {

                    inp.value = this.getElementsByTagName('input')[0].value;
                    document.querySelector('#icon-title__txt').innerHTML = inp.value;

                    closeAllLists();
                });
                el_AutocompleteList.appendChild(el_htmlAutocompleteListItem);
            }
        }
    });

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName('autocomplete-list');
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });
}