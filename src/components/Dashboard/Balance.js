import React, { useContext } from "react"
import dollarSign from "../../assets/images/dollar-sign.png"
import cart from "../../assets/images/cart.png"
import { LayoutContext } from "../layout/context"
import { localization } from "../../util/localization"

const Balance = () => {
  const { current_lang } = useContext(LayoutContext)

  return (
    <div className="balance">
      <div className="balance__inner">
        <div className="balance-item">
          <p className="balance-item__title">Account Balance</p>
          <div className="balance-item__info">
            <img src={dollarSign} className="icon" alt="Dollar sign Icon" />
            <span className="balance-item__info-sum">0</span>
          </div>
        </div>

        <div className="balance-item">
          <p className="balance-item__title">Spent Money</p>
          <div className="balance-item__info">
            <img src={cart} className="icon" alt="Cart Icon" />
            <span className="balance-item__info-sum">0</span>
          </div>
        </div>

        <div className="balance-item">
          <button className="balance-item__btn" type="button">
            Add Funds
          </button>
        </div>
      </div>
    </div>
  )
}

export default Balance
