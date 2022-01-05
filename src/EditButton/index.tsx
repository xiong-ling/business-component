import React, { useCallback, useState } from 'react'
import { Tooltip, Popover, Input, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import ClickOutsideThisElement from '../ClickOutsideThisElement'
import styles from './style.less'

interface IProps {
    /**
     * @description 自定义样式
     */
    className?: string;
    /**
     * @description 文本框中显示的内容
     */
    name: string;
    /**
     * @description 最大字数
     * @default 200
     */
    maxLength?: number;
    /**
     * @description 点击确定按钮的回调函数
     */
    onConfirmRename: (name: string) => void;
}

const EditButton = (props: IProps) => {
    const { name = "", maxLength = 200, onConfirmRename, className } = props;
    const [value, setValue] = useState(name)
    const [popoverVisible, setPopoverVisible] = useState(false)

    const onInputChange = useCallback((e) => {
        setValue(e.target.value || "")
    }, [setValue])

    const triggerRenameConfirm = useCallback(() => {
        setPopoverVisible(v => !v)
    }, [setPopoverVisible])

    const _onConfirmRename = useCallback(() => {
        triggerRenameConfirm()
        onConfirmRename && onConfirmRename(value)
    }, [triggerRenameConfirm, value])

    const content = (
        <>
            <div className={styles["edit-button-content"]}>
                <Input.TextArea
                    maxLength={200}
                    placeholder={name}
                    value={value}
                    onChange={onInputChange}
                />
                <div className={styles["edit-button-count"]}>
                    {`${value?.length || 0}/${maxLength}`}
                </div>
            </div>
            <div className={styles["edit-button-footer"]}>
                <Button type="primary" size="small" onClick={_onConfirmRename}>确定</Button>
                <Button size="small" onClick={triggerRenameConfirm}>取消</Button>
            </div>
        </>
    )

    return (
        <ClickOutsideThisElement onVisibled={triggerRenameConfirm} isAddEvent={popoverVisible}>
            <Popover
                placement="bottomLeft"
                title='重命名'
                content={content}
                overlayClassName={styles["edit-button-popover"]}
                trigger="click"
                visible={popoverVisible}
            >
                <Tooltip title='重命名'>
                    <EditOutlined />
                </Tooltip>
            </Popover>
        </ClickOutsideThisElement>
    )
}

export default React.memo(EditButton)