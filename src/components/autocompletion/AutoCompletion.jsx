import React, {PropTypes} from 'react';
import './autocompletion.scss';

export default class AutoCompletion extends React.PureComponent {

  getInput(props){
    const {InputComponent} = this.props;
    if (InputComponent) {
      return <InputComponent {...props} />;
    }
    return <input {...props} />;
  }

  getDropDown(){
    if (this.props.autocompleteList) {
      return (
          <div className="autocomplete__list-container">
            {this.props.autocompleteList.map((text, index) => (
              <div className="autocomplete__list-item" key={index}>
                {text}
              </div>
            ))}
          </div>
      )
    }

    return null;
  }

  render() {
    const props = {
      type: 'text',
      ...this.props,
      className: `autocomplete__input ${this.props.className ? this.props.className : ''}`
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

};
