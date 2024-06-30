import { Modal } from 'antd'
import React from 'react'

const ModalComponent = (props) => {
  const { title, open, ...rests } = props
  return (
    <div>
      <Modal
        title={title}
        open={open}
        {...rests}
      >
        {props?.children}
      </Modal>
    </div>
  )
}

export default ModalComponent