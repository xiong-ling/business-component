
## ClickOutsideThisElement
该组件功能是判断是否点击了它包裹的元素外部，用于包裹一个组件，当点击组件外部后进行隐藏操作。点击按钮，按钮弹出二次提示`Popover`，判断是否点击气泡外部。

<API></API>

### Demo:

```tsx
import React, { useCallback } from 'react';

import { ClickOutsideThisElement } from 'business-component';

export default () => {
    const [visabled, setVisabled] = React.useState(false);

     const triggerVisabled = useCallback(() => {
        setVisabled(v => !v)
    }, [setVisabled])

    return (
        <div
            style={{
                position: 'relative',
                height: '150px'
            }}
        >
            {
                visabled
                &&  <ClickOutsideThisElement
                        onVisibled={triggerVisabled}
                        isAddEvent={visabled}
                    >
                    <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        background: 'pink',
                        position: 'absolute',
                        top: '30px',
                        left: 0
                    }}></div>
                </ClickOutsideThisElement>
            }
            <button onClick={triggerVisabled}>按钮</button>
        </div>
    )
}
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo

### 详细实现：
```typescript
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
```