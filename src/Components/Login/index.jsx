import { useContext, useEffect, useState } from 'react'
import './style.css'
import { EstudianteContext } from '../../Context'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, errorLogin } = useContext(EstudianteContext)
    const navigate = useNavigate()


    const singLogin = (event) => {
        login(event, email, password)
        setEmail('')
        setPassword('')
    }


    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (user) {
            navigate('/estudiantes')
        }
    }, [])


    return (
        <>
            {
                user && <p>Loanding...</p>
            }
            {
                !user &&
                <div className='div-Login'>
                    <form className="form">
                        <h1><i class="bi bi-person-circle"></i></h1>
                        {errorLogin && (
                            <div className="alert alert-danger" role="alert">
                                Usuario o Password Incorrectas
                            </div>
                        )}
                        <input placeholder=" email" className="input text-black " type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input placeholder="password" className="input text-black" type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button onClick={(event) => singLogin(event)} >Ingresar</button>
                    </form>
                </div>
            }
        </>
    )
}
export default Login