# React AutoCompletion component

React AutoCompletion component helps to autocomplete search asynchronously.

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

## Props

* **autocompleteList [Array]** optional

An array of text that will be shown in autocomplete list.

* **onChange [function]** optional

Callback for input onChange event. The first argument is an input value. Callback can perform request to API and set **autocompleteList**

* **onSelect [function]** optional

Callback that is called when a user selects a value from autocomplete list. First argument is selected value.

* **InputComponent [Object]** optional

Component that will be used instead of HTML input. For example, you can use React-Bootstrap _FormControl_

* **attr [Object]** optional

Custom attributes for input component
