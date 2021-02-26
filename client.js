const API_URL = 'https://meower-test.herokuapp.com/mews';

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');

function listAllMews() {
    mewsElement.innerHTML = '';

    fetch(API_URL)
    .then(response => response.json())
    .then(mews => {
        mews.reverse();
        mews.forEach(mew => {
            const div = document.createElement('div');
            div.className = 'mew';

            const name = document.createElement('h3');
            name.textContent = mew.name;

            const content = document.createElement('p');
            content.textContent = mew.content;

            const date = document.createElement('small');
            date.textContent = mew.createdAt;
            
            div.appendChild(name);
            div.appendChild(content);
            div.appendChild(date);

            mewsElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
    })
}


listAllMews();

form.addEventListener('submit', e => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    // Put data in the object
    const mew = {
        name,
        content
    };

    // Send POST request to server
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        form.reset();
        form.style.display = '';
        loadingElement.style.display = 'none';
        listAllMews();
    })
    .catch(err => {
        form.style.display = '';
        loadingElement.style.display = 'none';
        console.log(err);
    });


    form.style.display = 'none';
    loadingElement.style.display = '';
});