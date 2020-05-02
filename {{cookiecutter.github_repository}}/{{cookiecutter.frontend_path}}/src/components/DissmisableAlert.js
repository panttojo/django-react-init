import React, { useState, useEffect } from 'react'

import { Alert } from 'reactstrap'


const DissmisableAlert = props => {
    const [visible, setVisible] = useState(false);
    const [currentID, setCurrentID] = useState('')

    const { id, messages, type } = props

    useEffect(() => {
        if (messages && messages.length > 0 && !visible && currentID !== id) {
            setVisible(true)
            setCurrentID(id)
        }
    }, [visible, id, currentID, messages])

    if (id && typeof messages === 'object') {
        let html_message = ''

        const alerts = messages.filter(item => {
            return !item.hasOwnProperty('field')
        })

        // TODO: Fix this function
        alerts.map((item, key) => html_message += `<li key=${key}>${item.message}</li>`)

        return (
            <Alert fade={true} color={type} isOpen={html_message.length > 0 && visible} toggle={() => setVisible(false)}>
                <div dangerouslySetInnerHTML={{ __html: html_message }}></div>
            </Alert>
        )
    }
    return <div></div>
}

export default DissmisableAlert;