import React, {PropTypes} from 'react';
import './autocompletion.scss';

const UP = 38;
const DOWN = 40;
const ENTER = 13;

export default class AutoCompletion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: !!(props.autocompleteList && props.autocompleteList.length),
      value: '',
      currentListIndex: -1,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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
      this.select(value);
    }
  }

  select(value) {
    this.setState({
      value: value,
      isListOpen: false,
      currentListIndex: -1,
    });

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(value);
    }
  }

  onBlur() {
    // We have to wait while click will be triggered
    // and then hide autocomplete list
    setTimeout(() => {
      this.setState({
        isListOpen: false,
        currentListIndex: -1,
      })
    }, 200);
  }

  onKeyDown(e) {
    const keyCode = e.nativeEvent.which || e.nativeEvent.keyCode;

    if (keyCode === UP) {
      e.preventDefault();
      this.keyPressedUp();
    } else if (keyCode === DOWN) {
      e.preventDefault();
      this.keyPressedDown();
    } else if (keyCode === ENTER) {
      this.keyPressedEnter(e);
    }
  }

  keyPressedUp() {
    let index;
    if (this.state.isListOpen) {
      if (this.state.currentListIndex === -1) {
        index = this.props.autocompleteList.length - 1;
      } else {
        index = this.state.currentListIndex - 1;
      }
      this.setState({currentListIndex: index});
    }
  }

  keyPressedDown(){
    let index;
    if (this.state.isListOpen) {
      if (this.state.currentListIndex === this.props.autocompleteList.length - 1) {
        index = - 1;
      } else {
        index = this.state.currentListIndex + 1;
      }
      this.setState({currentListIndex: index});
    }
  }

  keyPressedEnter(e) {
    if (this.state.isListOpen && this.state.currentListIndex !== -1) {
      e.preventDefault();
      this.select(this.props.autocompleteList[this.state.currentListIndex]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.autocompleteList != nextProps.autocompleteList) {
      const isListOpen = !!(nextProps.autocompleteList && nextProps.autocompleteList.length);
      this.setState({
        isListOpen: isListOpen,
        currentListIndex: -1,
      });
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
            {this.props.autocompleteList.map((text, index) => {
              const className = index === this.state.currentListIndex ? 'autocomplete__active' : '';
              return (
                <div
                    className={`autocomplete__list-item ${className}`}
                    key={index}
                    onClick={this.onSelect(text)}>
                  {text}
                </div>
            )})}
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
      onKeyDown: this.onKeyDown,
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
  InputComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  autocompleteList: PropTypes.array,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  attr: PropTypes.object,
};
