import React from 'react';

import {Panel, PanelBody, PanelHeader} from 'app/components/panels';
import FieldFromConfig from 'app/views/settings/components/forms/fieldFromConfig';
import {sanitizeQuerySelector} from 'app/utils/sanitizeQuerySelector';

import {FieldObject, JsonFormObject} from './type';

type Props = {
  /**
   * Panel title
   */
  title?: string;

  /**
   * List of fields to render
   */
  fields: FieldObject[];

  // TODO(ts): See if this is still in use
  access: any;
  features: any;

  additionalFieldProps: {[key: string]: any};

  /**
   * The name of the field that should be highlighted
   */
  highlighted?: string;

  /**
   * Renders inside of PanelBody at the start
   */
  renderHeader?: (arg: JsonFormObject) => React.ReactNode;

  /**
   * Renders inside of PanelBody before PanelBody close
   */
  renderFooter?: (arg: JsonFormObject) => React.ReactNode;

  /**
   * Disables the entire form
   */
  disabled?: boolean;
};

export default class FormPanel extends React.Component<Props> {
  render() {
    const {
      title,
      fields,
      access,
      disabled,
      additionalFieldProps,
      renderFooter,
      renderHeader,
      ...otherProps
    } = this.props;

    return (
      <Panel key={title} id={sanitizeQuerySelector(title)}>
        {title && <PanelHeader>{title}</PanelHeader>}
        <PanelBody>
          {typeof renderHeader === 'function' && renderHeader({title, fields})}

          {fields.map(field => {
            if (typeof field === 'function') {
              return field();
            }

            // eslint-disable-next-line no-unused-vars
            const {defaultValue, ...fieldWithoutDefaultValue} = field;

            // Allow the form panel disabled prop to override the fields
            // disabled prop, with fallback to the fields disabled state.
            if (disabled === true) {
              fieldWithoutDefaultValue.disabled = true;
              fieldWithoutDefaultValue.disabledReason = undefined;
            }

            return (
              <FieldFromConfig
                access={access}
                disabled={disabled}
                key={field.name}
                {...otherProps}
                {...additionalFieldProps}
                field={fieldWithoutDefaultValue}
                highlighted={this.props.highlighted === `#${field.name}`}
              />
            );
          })}
          {typeof renderFooter === 'function' && renderFooter({title, fields})}
        </PanelBody>
      </Panel>
    );
  }
}
