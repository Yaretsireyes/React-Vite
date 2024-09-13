import { useContext } from "react"
import { EstudianteContext } from "../../Context"

const MyModal = ({ title, children, cerrarModal, aceptarCambios, textButtonSucces }) => {


    const { saveUser, updateStudent, isEdit, id, form, errorLogin, errores, setIsModalOpen, modalElimina } = useContext(EstudianteContext)
    return (
        <>
            <div className="bg-dark d-flex justify-content-center align-items-center "
                style={{ zIndex: 1, position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(34,34,34,0,90)' }}
            >
                <div className="p-2 bg-info w-50"
                    style={{ zIndex: 1, position: 'absolute' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {title}
                                </h1>
                                <button type="button"
                                    className="btn-close"
                                    onClick={() => cerrarModal(false)}
                                >
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className={errorLogin ? 'alert alert-danger' : 'hidden'} role="alert">
                                    <ul>
                                        {
                                            errores.map((error) => (
                                                <li key={error}>{error}</li>
                                            ))
                                        }
                                    </ul>
                                    {errorLogin && <p>Ha ocurrido un Error</p>}
                                </div>
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                    className="btn btn-outline-success"
                                    onClick={() => cerrarModal(false)}
                                >
                                    Cerrar
                                </button>
                                <button type="button"
                                    onClick={aceptarCambios}
                                    // onClick={() => isEdit ? updateStudent(id, form) : saveUser()}
                                    className="btn btn-outline-danger  "
                                >
                                    {textButtonSucces}
                                    {textButtonSucces ? '' : isEdit ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyModal
