const axios = require("axios");
const eventsList = document.querySelector('#events');
const eventForm = document.querySelector('form');
const input = document.querySelector('input');
const state = {};

eventForm.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    const name = input.value; //the new item you end up creating
    try{
        await axios.post('/events', {
        name
        });
        await fetchEvents();
        renderEvents();
        input.value = ''; //clear form field
    }
    catch(ex){
        console.log(ex.response.data); //print error
    }
})

eventsList.addEventListener('click', async(ev) => {
    if(ev.target.tagName === 'BUTTON'){
        const id = ev.target.getAttribute('data-id');
        await axios.delete(`/events/${id}`);
        await fetchEvents();
        renderEvents();
    }
});

const fetchEvents = async() => {
    const response = await axios.get('/events');
    state.events = response.data;
};

const renderEvents = () => {
    const html = state.events.map( event => {
        return `
            <li>
                <a href = '#${event.id}'>
                    ${event.name}
                    <button data-id='${event.id}'>x</button>
                </a>
            </li>
        `
    }).join('');
    eventsList.innerHTML = html;
};

const start = async() => {
    await fetchEvents();
    renderEvents();
};

start();

