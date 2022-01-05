
import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from 'antd'
import styles from './index.css'

interface IProps {
    /**
    * @description 高度，超出多高隐藏，一般是 行高 * 行数
    */
    height: number;
    /**
    * @description Tooltip 的提示内容，一般传入显示的文字
    */
    title: string;
    /**
     * @description 类名，用于样式
     * @default is-overflow
     */
    classname?: string;
    /**
    * @description 子组件
    */
    children: React.ReactElement;
}

const IsShowToolTip = (props: IProps): React.ReactElement => {
    const [isOverflow, setIsOverflow] = useState(false)
    const { children, height, title, classname = 'is-overflow' } = props
    const elRef = useRef(null)

    useEffect(() => {
        function resize() {
            const el: any = elRef && elRef.current;
            setIsOverflow(el?.scrollHeight && el?.scrollHeight > height);
        }
        resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        isOverflow
            ? <Tooltip placement="top" title={title}>
                {
                    React.cloneElement(children, {
                        className: `${styles[classname]}`,
                        ref: elRef
                    })
                }
            </Tooltip>
            : <>
                {
                    React.cloneElement(children, {
                        ref: elRef
                    })
                }
            </>
    )
}

export default React.memo(IsShowToolTip)