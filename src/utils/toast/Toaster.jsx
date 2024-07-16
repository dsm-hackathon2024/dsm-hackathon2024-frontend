'use client'
import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store/store'
import { deleteToast } from '../store/modules/toast'
import styled, { keyframes } from 'styled-components'
import { Text } from '../../components'

const variants = {
  init: { y: -50, scale: 0, opacity: 0, originY: -1 },
  open: { y: 0, scale: 1, opacity: 1, originY: 0 },
  closed: { y: -50, scale: 0, opacity: 0, transition: { duration: 0.3, delay: 0.1 }, originY: -1 },
}

const Toaster = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state) => state.toast)
  const animationFrame = useRef(undefined)
  const beforeTime = useRef(undefined)
  const sortedData = useRef([])
  const isHover = useRef(false)

  const animationStep = (timeStamp) => {
    if (!beforeTime.current) {
      beforeTime.current = timeStamp
    }

    const deleteDataId = []

    if (!isHover.current) {
      const elapsed = timeStamp - beforeTime.current

      sortedData.current = sortedData.current.map(value => {
        const duration = value.duration - elapsed
        if (duration <= 0) {
          deleteDataId.push(value.id)
        }
        return {
          ...value,
          duration,
        }
      })
    }

    deleteDataId.forEach(id => dispatch(deleteToast({ id })))
    beforeTime.current = timeStamp
    requestAnimationFrame(animationStep)
  }

  useEffect(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    const key = sortedData.current.map(value => value.id)

    sortedData.current = data.map(value => {
      const dataIndex = key.indexOf(value.id)
      const data = sortedData.current[dataIndex]
      return {
        ...value,
        duration: (dataIndex === -1 || data.duration === Infinity ? value : sortedData.current[dataIndex]).duration,
      }
    })
    animationFrame.current = requestAnimationFrame(animationStep)
  }, [data])

  return (
    <Container
      layout
      layoutRoot
    >
      <AnimatePresence mode="popLayout">
        {data.map(value => (
          <ToastBox
            initial={'init'}
            layout
            animate={'open'}
            exit={'closed'}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            variants={variants}
            key={value.id}
            layoutId={value.id}
            style={{ originX: 0.5 }}
            onMouseEnter={() => {
              isHover.current = true
            }}
            onMouseLeave={() => {
              isHover.current = false
            }}
          >
            {value.type === 'loading' ? (
              <LoadingIcon />
            ) : value.type === 'error' ? (
              <CloseCircle src='assets/closeCircle.png' />
            ) : (
              <CheckCircle src='assets/checkCircle.png' />
            )}
            <Text type='subtitleLarge'>{value.message}</Text>
          </ToastBox>
        ))}
      </AnimatePresence>
    </Container>
  )
}

export default Toaster

const Container = styled(motion.nav)`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  padding-top: 20px;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  pointer-events: none;
`

const ToastBox = styled(motion.div)`
  width: fit-content;
  background-color: rgba(255,255,255,0.64);
  padding: 18px 24px;
  box-shadow: 0px 4px 12px 8px rgba(0,0,0,0.12);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  display: flex;
  gap: 8px;
  pointer-events: auto;
  transform-origin: top center;
  white-space: nowrap;
`

const spin = keyframes`
  to {
      transform: rotate(360deg);
  }
`

const LoadingIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #E4E6EB;
  border-top: 2px solid #181919;
  border-radius: 20px;
  animation: ${spin} 1s linear infinite;
`

const CloseCircle = styled.img`
  width: 20px;
  height: 20px;
  color: #F5290A
`

const CheckCircle = styled.img`
  width: 20px;
  height: 20px;
  color: #0A7FF5
`