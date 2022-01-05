## IsShowToolTip
总有这样的需求：元素多行显示，超出时隐藏有`tooltip`提示，否则不进行`tooltip`提示。

该组件就适用于该场景，单行，多行显示，超出进行`tooltip`提示，但是也要记得进行`CSS`样式的控制。

<API></API>

### Demo:
<code src="./demo.tsx"></code>


### 详细实现：
- 定高，给定多行隐藏的样式
- 当元素超出高度时，在外层套上`Tooltip` 后显示，否则正常显示

```typescript

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
```

CSS样式
```css
.is-overflow{
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    position: relative;
}

.action-is-show {
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.drag-info-action-info{
    height: 40px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
}
```