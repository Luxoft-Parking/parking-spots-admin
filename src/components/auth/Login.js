import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Form, { Label, Control, Group } from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

import auth, { login } from '../../utils/authentication';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handlers = { username: setUsername, password: setPassword };

    function onInputChange(event) {
        handlers[event.target.id](event.target.value);
    }

    async function loginClick() {
        if (await login(username, password))
            props.history.push('/admin')
        else {
            setLoginError(true);
        }
    }
    return (
        auth.currentUser ? (<Redirect to="/admin" />) :
            (
                <>
                    {
                        loginError &&
                        <Alert variant='warning'>
                            <Alert.Heading>Login Error</Alert.Heading>
                        There was problem validating your credentials</Alert>
                    }

                    <Form>
                        <Group controlId="username">
                            <Label>Email address</Label>
                            <Control type="email" placeholder="Enter email" onChange={onInputChange} />
                        </Group>

                        <Group controlId="password">
                            <Label>Password</Label>
                            <Control type="password" placeholder="Password" onChange={onInputChange} />
                        </Group>
                        <Button variant="primary" type="button" onClick={loginClick}>
                            Login
                </Button>
                    </Form>
                </>
            )
    )
}

Login.propTypes = {

}

export default Login

