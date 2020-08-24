import React from "react"

const TextAlert = ({ children, error = false }) => {
  return (
    <div className={error ? 'alert-message--error' : 'alert-message'}>
      <div className={'alert-message__input'}>
        {children}
      </div>
    </div>
  )
}
export default TextAlert;