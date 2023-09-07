function getCharacters() {
    return fetch('https://swapi.dev/api/people/13')
        .then((response) => {
            console.log(response.json());
            return response.json();
        })
        .then((value) => {
            console.log(value.name);
            return {
                name: value.name
            }
        })
}

getCharacters();