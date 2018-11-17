import React from 'react';

class JSONretriever extends React.Component {
    fetchJSONfromURL(url) {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => console.log(json));
    }
}
export default JSONretriever;
