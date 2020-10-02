import React, { useState, useCallback, useRef } from 'react'

import { connect } from 'react-redux'

import {
    Grid,
    TextField,
    Input
} from '@material-ui/core'

import {
    actionAddMessage
} from './actions'

import './index.css'    

const ChatMessageItem = ({ botId = '', content = '', fromBot = false }) => {    
    const className = `chat-message-item ${ fromBot ? "chat-message-item-bot" : "chat-message-item-sended" }`

    return (
        <div className = {className}>
            <span>{content}</span>
        </div>
    )
}

const ChatSection = ({ botList = [], dispatch, messages = [] }) => {
    const imageContainerRef = useRef()
    const [ currentMessage, setCurrentMessage ] = useState('');
    const toggleOnValueChangeInput = useCallback(e => {
        setCurrentMessage(e.target.value);
    }, [])

    const toggleOnSubmit = useCallback(e => {
        e.preventDefault()

        if (currentMessage.trim() !== '') {
            const newMessage = {
                content:currentMessage,
                fromBot:false
            }

            dispatch(actionAddMessage(newMessage))
            setCurrentMessage('')

            const { current:elt } = imageContainerRef;
            elt.scrollTop = elt.scrollHeight
        }
    }, [currentMessage, imageContainerRef])

    return (
        <Grid 
            xs = {9}
            style = {{ height:'100%' }}
        >
            <div 
                ref = {imageContainerRef}
                style = {{ height:'95%', overflow:'auto' }}
            >
                {
                    messages.map(({ id, content, fromBot }) => {
                        return (
                            <ChatMessageItem 
                                key = {id} 
                                content = {content}
                                fromBot = {fromBot}
                            />
                        )
                    })
                }
            </div>
            <form
                style = {{ height:'5%' }}
                onSubmit = {toggleOnSubmit}
            >
                <Input
                    style = {{ width:'100%', position:'fixed', bottom:0 }}
                    onChange = {toggleOnValueChangeInput}
                    value = {currentMessage}
                    placeholder = "Envoyer un message"
                />
            </form>
        </Grid>
    )
}

const mapStateToProps = ({  chat:{ messages }, botList }) => ({ botList, messages })

export default connect(mapStateToProps)(ChatSection);
