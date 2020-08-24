import React from "react"
import Select from "react-select"

export const SelectLanguage = ({ options, field, form}) => (
  <Select options={options}
          name={field.name}
          onChange={(option) => form.setFieldValue(field.name, option.value)}
          onBlur={field.onBlur}
          defaultValue={options.filter(option => option.value === 'ro')}
  />
)