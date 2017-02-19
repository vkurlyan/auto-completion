import React from 'react';
import AutoCompletion from './autocompletion/AutoCompletion';
import jp from 'jsonp-promise';
import { Grid, PageHeader, FormControl, Alert, FormGroup } from 'react-bootstrap'

const AUTOCOMPLETE_URL = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=%s';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autocompleteList: null,
        };
        this.onAutocompleteChange = this.onAutocompleteChange.bind(this);
        this.onTextAutocompleted = this.onTextAutocompleted.bind(this);
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
                // Error does not interrupt user to complete entering
                console.log(error);
            });
        this.setState({selected: null})
    }

    onTextAutocompleted(value) {
        this.setState({selected: value})
    }

    render() {
        return (
            <Grid>
                <PageHeader>Youtube Autocompletion</PageHeader>
                <FormGroup>
                    <AutoCompletion
                        autocompleteList={this.state.autocompleteList}
                        onChange={this.onAutocompleteChange}
                        onSelect={this.onTextAutocompleted}
                        attr={{
                            placeholder: 'Enter text'
                        }}
                        InputComponent={FormControl}
                    />
                </FormGroup>
                {this.state.selected &&
                    <Alert bsStyle="success">
                        Selected: {this.state.selected}
                    </Alert>
                }
            </Grid>
        )
    }
}
