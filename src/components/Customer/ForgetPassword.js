import React, { useRef, useState } from 'react'
import { Card , Form , Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { NavLink} from 'react-router-dom';


export default function ForgetPassword() {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error ,setError] = useState();
    const [message  ,setMessage] = useState();
    const [loading , setLoading] = useState(false);
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check inbox for further instructions")
        }catch{
            setError("Failed to Reset Password")
            console.log(emailRef.current.value)
        }
        setLoading(false)
    }
    return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Reset Password</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref={emailRef}/>
                    </Form.Group>
                <div className='d-flex'>
                    <Button disabled={loading} className='mt-3 mx-2' variant='outline-dark' type="submit">Reset Password</Button>
                    <Button className='btn-warning text-white mt-3 mx-4' to="/">Log In</Button>
                </div>
                </Form>
        <div className="w-100 text-center mt-2">
            Need an account? <NavLink to="/signup">Sign Up</NavLink>
        </div>
            </Card.Body>
        </Card>
    </>
  )
}