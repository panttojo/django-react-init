import React from 'react'

import { Card, CardBody } from 'reactstrap'


const isLoading = () => {
    return (
        <Card>
            <CardBody>
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-2x"></i>
                </div>
            </CardBody>
        </Card>
    )
}

export default isLoading