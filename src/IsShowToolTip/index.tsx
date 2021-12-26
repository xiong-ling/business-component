
import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from 'antd'
import styles from './index.css'

interface IProps {
    height: number;
    title: string;
    classname?: string;
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