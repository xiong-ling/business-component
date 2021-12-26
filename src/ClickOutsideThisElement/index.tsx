import React, { useEffect } from 'react'

interface IProps {
    children: React.ReactElement; // 包裹的组件
    isAddEvent: boolean; // 是否进行监听，没有必要一直监听，在这是 Popover 显示的时候才需要监听外部点击事件
    onVisibled: () => void; // 点击元素外部后的回调函数
}

const ClickOutsideThisElement = (props: IProps): React.ReactElement => {
    const { children, onVisibled, isAddEvent } = props;

    const handleClick = (e: { nativeEvent: { stopImmediatePropagation: () => void; }; }) => {
        e.nativeEvent.stopImmediatePropagation()
    }

    useEffect(() => {
        if (isAddEvent) {
            const documentClick = () => {
                onVisibled && onVisibled()
            }
            document.addEventListener('click', documentClick)
    
            return () => {
                document.removeEventListener('click', documentClick)
            }
        }
    }, [isAddEvent, onVisibled])

    return <div onClick={handleClick}>{children}</div>
}

export default React.memo(ClickOutsideThisElement);