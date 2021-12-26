import React from "react";
import IsShowToolTip from './index'
import styles from '../index.less'

const Demo: React.FC<any> = props => {
    return (
        <IsShowToolTip height={44} title="IsShowToolTip的提示" classname="action-is-show">
            <div className='drag-info-action-info'>
            哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
        </IsShowToolTip>
    )
}

export default React.memo(Demo)