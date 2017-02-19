import AutoCompletion from '../AutoCompletion'
import renderer from 'react-test-renderer';
import React from 'react';


describe('AutoCompletion', () => {
    it('shows input', () => {
        const component = renderer.create(
            <AutoCompletion
                onChange={() => {}}
                onSelect={() => {}}
                attr={{
                    className: 'custom-class-name',
                    id: 'custom-id',
                    'data-custom-attr': 'test'
                }}
            />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('shows input with suggestions list', () => {
        const component = renderer.create(
            <AutoCompletion
                autocompleteList={['test 1', 'test 2', 'test 3']}
            />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('shows autocompletion with custom input component', () => {
        const CustomInput = (props) => (
            <div className="customInput">
                <input {...props} />
            </div>
        );

        const component = renderer.create(
            <AutoCompletion
                InputComponent={CustomInput}
            />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });
});
