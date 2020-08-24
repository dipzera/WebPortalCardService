import React from "react"
import Select from "react-select"

export const SelectCountry = ({ options, field, form}) => (
  <Select options={options}
          name={field.name}
          onChange={(option) => form.setFieldValue(field.name, option.value)}
          onBlur={field.onBlur}
  />
)