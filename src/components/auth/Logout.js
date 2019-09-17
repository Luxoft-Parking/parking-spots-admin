import React from 'react'
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'

import {logout} from '../../utils/authentication'

function Logout(props) {
    logout();
    return (
        <Redirect to="/login"/>
    )
}

Logout.propTypes = {

}

export default Logout

