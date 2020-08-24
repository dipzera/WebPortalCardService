import React from "react"

const TextAlert = ({ children }) => {
  return (
    <div className={"alert-message"}>
      <div className={'alert-message__input'}>
        {children}
      </div>
    </div>
  )
}
export default TextAlert;