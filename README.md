# React AutoCompletion component

React AutoCompletion component helps to autocomplete a search asynchronously.

Example:

```
<AutoCompletion
	autocompleteList={this.state.autocompleteList}
	onChange={this.onAutocompleteChange}
	onSelect={this.onTextAutocompleted}
	InputComponent={FormControl}
	attr={{
	    id: 'custom-id',
	    className: 'custom-class-name'
	}}
/>
```

## Install

* Run commands:

> git clone https://github.com/vkurlyan/auto-completion.git

> cd auto-completion

> npm install

> npm start

* Open http://127.0.0.1:8888/

## Tests

To run tests execute command in root directory:

> npm test

## Props

* **autocompleteList [Array]** optional

An array of texts will be shown in autocomplete list.

* **onChange [function]** optional

Handler of input onChange event. The first argument is an input value. Handler can perform request to API and set **autocompleteList**

* **onSelect [function]** optional

Handler is called when a user selects a value from the list. First argument is selected value.

* **InputComponent [Object]** optional

Component that will be used instead of HTML input element. For example, you can use React-Bootstrap _FormControl_

* **attr [Object]** optional

Custom attributes for the input component
