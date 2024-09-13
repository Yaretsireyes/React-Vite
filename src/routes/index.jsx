
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Components/Login"
import Layout from '../Components/Layout'
import { EstudiantesProvider } from '../Context'


const index = () => {

    

    return (
        <>
            <BrowserRouter>
                <EstudiantesProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/*" element={<Layout />} />
                    </Routes>
                </EstudiantesProvider>
            </BrowserRouter>
        </>
    )
}
export default index
