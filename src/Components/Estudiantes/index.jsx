import { useContext, useEffect } from 'react'
import MyModal from '../../Components/MyModal'
import { EstudianteContext } from '../../Context'




function Estudiantes() {
    const { value,
        setValue,
        handleForm,
        form,
        estudiantes,
        handleEditar,
        isModalOpen,
        users,
        successCreateUser,
        setModalElimina,
        deleteUsuarios,
        handleDelete,
        updateUser,
        modalElimina,
        setIsModalOpen,
        saveUser,
        next,
        previous,
        user,

    } = useContext(EstudianteContext)

    useEffect(() => {
        users()
    }, [updateUser, modalElimina, successCreateUser])

    const filterEstudiante = estudiantes.filter(student => (
        student.name.toLowerCase().includes(value.toLowerCase())
    ))


    return (
        <>
            {isModalOpen &&
                <MyModal title={'Crear Usuario'} cerrarModal={setIsModalOpen} aceptarCambios={saveUser}
                >
                    <>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nombre De usuario</label>
                                <input type="text" className="form-control shadow-sm" id="exampleInputEmail1" placeholder='name' name='name'
                                    value={form.name}
                                    onChange={(event) => handleForm(event)}

                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control shadow-sm" id="exampleInputEmail1" placeholder='email' name='email'
                                    value={form.email}
                                    onChange={(event) => handleForm(event)}

                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="text" className="form-control shadow-sm" id="exampleInputEmail1" placeholder='password' name='password'
                                    value={form.password}
                                    onChange={(event) => handleForm(event)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Avatar</label>
                                <input type="text" className="form-control shadow-sm" id="exampleInputEmail1" placeholder='avatar' name='avatar'
                                    value={form.avatar}
                                    onChange={(event) => handleForm(event)}
                                />
                            </div>
                        </form>
                    </>
                </MyModal>
            }
            {
                modalElimina && <MyModal title={'ELIMINAR'} cerrarModal={setModalElimina} aceptarCambios={deleteUsuarios} textButtonSucces={'Eliminar'}>
                    <h1 className='text-center'>
                        Are you sure?
                    </h1>
                    <div className="d-flex justify-content-center align-items-center">
                        {/* <button onClick={() => deleteUsuarios()} className='btn btn-primary mt-5'>Si</button> */}
                        {/* <button onClick={() => setModalElimina(false)} className='btn btn-danger mt-5'>No</button> */}
                    </div>
                </MyModal>
            }
            <div className='container text-center'>
                <div className='d-flex justify-content-end pt-4'>
                    <input
                        style={{ width: '50%', height: '40px', outlineStyle: 'none', marginRight: '150px' }}
                        className='form-label 1875rem'
                        placeholder='Buscar Estudiante'
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button type="button"
                        className="button "
                        onClick={() => setIsModalOpen(true)}
                    >
                        Crear Usuario
                    </button>
                </div>
                <div className={successCreateUser || updateUser ? 'alert alert-success' : 'hidden'} role="alert">
                    {successCreateUser && <p>Se ha guadado correctamente</p>}
                    {updateUser && <p>Se ha actualizado correctamente</p>}
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr className='text-center text-decoration-underline'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Avatar</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterEstudiante.map((item, index) => (
                                <tr key={index + 1} className='margenes'>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.password}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>{<img src={item.avatar} width='80px' className='rounded-circle' />}</td>
                                    <td className='td gap-4'>
                                        <button style={{ width: '60px' }} onClick={() => handleDelete(item.id)}><i className="bi bi-trash-fill"></i></button>
                                        <button style={{ width: '60px' }} onClick={() => handleEditar(item.id)} ><i className="bi bi-pencil-square"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item"><a className="page-link" onClick={previous}>Previous</a></li>
                        <li className="page-item"><a className="page-link" onClick={next}>Next</a></li>
                    </ul>
                </nav>
            </div >
        </>
    )
}

export default Estudiantes
