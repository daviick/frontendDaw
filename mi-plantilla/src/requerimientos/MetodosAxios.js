import axios from 'axios';

export default class MetodosAxios {
    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api'        
    });

    static obtener_tutores = () => {
        return MetodosAxios.instanceAxios.get(`/tutores/`);
    }
    static crear_tutor = (tutor) => {
        return MetodosAxios.instanceAxios.post(`/tutores/create`, tutor);
    }
    static editar_tutor = (tutor) => {
        return MetodosAxios.instanceAxios.put(`/tutores/${tutor.id}`, tutor );
    }
    static eliminar_tutor = (id) => {
        return MetodosAxios.instanceAxios.delete(`/tutores/${id}`, { data: {} });
    }
}