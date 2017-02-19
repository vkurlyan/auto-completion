import React, {PropTypes} from 'react';
import './autocompletion.scss';

export default class AutoCompletion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(event) {
    this.setState({value: event.target.value});
    const value = event.target.value.trim();

    if (!value) {
      this.setState({isListOpen: false});
    } else if (typeof this.props.onChange === 'function'){
      this.props.onChange(value);
    }
  }

  onSelect(value) {
    return () => {
      this.setState({
        value: value,
        isListOpen: false
      });

      if (typeof this.props.onSelect === 'function') {
        this.props.onSelect(value);
      }
    }
  }

  onBlur() {
    // We have to wait while click will be triggered
    // and then hide autocomplete list
    setTimeout(() => {
      this.setState({isListOpen: false})
    }, 200);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      const isListOpen = !!(nextProps.autocompleteList && nextProps.autocompleteList.length);
      this.setState({isListOpen: isListOpen});
    }
  }

  getInput(props) {
    const {InputComponent} = this.props;
    if (InputComponent) {
      return <InputComponent {...props} />;
    }
    return <input {...props} />;
  }

  getDropDown(){
    if (this.state.isListOpen && this.props.autocompleteList && this.props.autocompleteList.length) {
      return (
          <div className="autocomplete__list-container">
            {this.props.autocompleteList.map((text, index) => (
              <div
                  className="autocomplete__list-item"
                  key={index}
                  onClick={this.onSelect(text)}>
                {text}
              </div>
            ))}
          </div>
      )
    }
  }

  render() {
    const customClass = this.props.attr && this.props.attr.className ? this.props.attr.className : '';
    const props = {
      type: 'text',
      ...this.props.attr,
      className: `autocomplete__input ${customClass}`,
      onKeyUp: this.onKeyUp,
      value: this.state.value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    }

    return (
      <div className="autocomplete__container">
        {this.getInput(props)}
        {this.getDropDown()}
      </div>
    )
  }
}

AutoCompletion.propTypes = {
  inputComponent: PropTypes.object,
  autocompleteList: PropTypes.array,
  onChange: PropTypes.func,
};
