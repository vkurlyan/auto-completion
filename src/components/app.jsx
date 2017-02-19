import React from 'react';
import AutoCompletion from './autocompletion/AutoCompletion';
import jp from 'jsonp-promise';

const AUTOCOMPLETE_URL = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=%s';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autocompleteList: null,
        };
        this.onAutocompleteChange = this.onAutocompleteChange.bind(this);
    }

    onAutocompleteChange(value) {
        const url = AUTOCOMPLETE_URL.replace('%s', encodeURIComponent(value));
        jp(url).promise
            .then((response) => {
                if (response && response[1]) {
                    this.setState({autocompleteList: response[1]})
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onTextAutocompleted(value) {
        console.log(`Selected text: ${value}`);
    }

    render() {
        return (
          <div>
            <h1>Autocompletion component</h1>
            <AutoCompletion
                autocompleteList={this.state.autocompleteList}
                onChange={this.onAutocompleteChange}
                onSelect={this.onTextAutocompleted}
            />
          </div>
        )
    }
}
