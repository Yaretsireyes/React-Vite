import axios from "axios"
import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EstudianteContext = createContext()

export const EstudiantesProvider = ({ children }) => {

    const navigate = useNavigate()
    const [errorLogin, setErrorLogin] = useState(false)
    const [estudiantes, setEstudiantes] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState(null)
    const [successCreateUser, setSuccessCreateUser] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const [modalElimina, setModalElimina] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errores, setErrores] = useState([])
    const [user, setUser] = useState([])
    const [itemByPage, setItemByPage] = useState(10)
    const [form, setForm] = useState(
        {
            name: '',
            email: '',
            password: '',
            avatar: ''
        }
    )


    const [value, setValue] = useState('')


    const handleForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }


    const saveUser = async () => {
        try {
            if (isEdit) {
                try {
                    await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, form)
                    setIsModalOpen(false)
                    setErrorLogin(false)
                    setErrores([])
                    setUpdateUser(true)
                    setSuccessCreateUser(false)
                } catch (err) {
                    if (err.status != 400) {
                        setErrores(['Ocurrio un Error en el servidorm intenta de nuevo'])
                        setErrorLogin(true)
                    } else {
                        setIsModalOpen(true)
                        setErrorLogin(true)
                        setErrores(err.response.data.message)
                    }
                }
            } else {
                await axios.post('https://api.escuelajs.co/api/v1/users', form)
                setSuccessCreateUser(true)
                setIsModalOpen(false)
                setUpdateUser(false)
                setErrorLogin(false)
                setErrores([])
            }
        } catch {
            setSuccessCreateUser(false)
            setErrorLogin(true)
            setErrores(err.response.data.message)
        }
    }


    const handleEditar = async (id) => {
        setIsModalOpen(true)
        setErrorLogin(false)
        setErrores([])
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`)
        setForm(response.data);
        setIsEdit(true)
        setId(id)
    }


    const updateStudent = async (id, data) => {
        // let students = [...estudiantes]
        // let editStudent = students.find((estudiante) => estudiante.id === id)
        // editStudent.nombre = data.nombre
        // editStudent.edad = data.edad
        // editStudent.colegio = data.colegio
        // editStudent.grado = data.grado
        try {
            await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, data)
            setIsModalOpen(false)
            setErrorLogin(false)
            setErrores([])
            setUpdateUser(true)
            setSuccessCreateUser(false)
        } catch (err) {
            if (err.status != 400) {
                setErrores(['Ocurrio un Error en el servidorm intenta de nuevo'])
                setErrorLogin(true)
            } else {
                setIsModalOpen(true)
                setErrorLogin(true)
                setErrores(err.response.data.message)
            }
        }
    }


    const resetForm = () => {
        setIsEdit(false)
        setForm({ name: '', email: '', password: '', avatar: '' })
        setErrorLogin(false)
        setErrores([])
    }



    const login = async (event, email, password) => {
        event.preventDefault()
        try {
            const user = await axios.post('https://api.escuelajs.co/api/v1/auth/login',
                { email, password }
            )
            if (user.status == 201) {
                navigate('/estudiantes')
                localStorage.setItem('user', JSON.stringify(user.data))
            }
        } catch (eror) {
            setErrorLogin(true)
        }
    }


    const users = async () => {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users`)
        setUser(response.data)
        setEstudiantes(response.data.slice(0, itemByPage))
    }

    const next = () => {
        setEstudiantes(user.slice(itemByPage, itemByPage + 10))
        setItemByPage(itemByPage + 10)
    }

    const previous = () => {
        setEstudiantes(user.slice(itemByPage - 20, itemByPage - 10))
        setItemByPage(itemByPage - 10)
    }


    const handleDelete = (id) => {
        resetForm()
        setModalElimina(true)
        setId(id)
    }

    const deleteUsuarios = async () => {
        await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`)
        setId(null)
        setModalElimina(false)
    }


    return (
        <EstudianteContext.Provider value={{
            form,
            handleForm,
            saveUser,
            estudiantes,
            setEstudiantes,
            handleEditar,
            resetForm,
            updateStudent,
            isEdit,
            id,
            value,
            setValue,
            login,
            errorLogin,
            users,
            successCreateUser,
            isModalOpen,
            errores,
            setIsModalOpen,
            setUpdateUser,
            setModalElimina,
            modalElimina,
            deleteUsuarios,
            handleDelete,
            updateUser,
            navigate,
            setErrorLogin,
            next,
            previous,
            user
        }}>
            {children}
        </EstudianteContext.Provider>
    )
}

