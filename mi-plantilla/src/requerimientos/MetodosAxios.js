import axios from 'axios';

export default class MetodosAxios {
    static instanceAxios = axios.create({
        baseURL: 'http://localhost:8000/api'
        // baseURL: 'https://reqres.in/api'
    });

    // static login = (id) => {
    //     return MetodosAxios.instanceAxios.get(`/users/${id}`);
    // }
    
    // ORGANIZACIONES
    static obtener_organizaciones = () => {
        return MetodosAxios.instanceAxios.get(`/organizations/`);
    }

    static crear_organizacion = (organizacion) => {
        console.log('recibo organizacion', organizacion);
        return MetodosAxios.instanceAxios.post(`/organizations/`, organizacion);
    }

    static editar_organizacion = (organizacion) => {
        console.log('recibo organizacion', organizacion);
        return MetodosAxios.instanceAxios.put(`/organizations/${organizacion.id}/`, organizacion);
    }

    static eliminar_organizacion = (id) => {
        console.log('recibo id', id);
        return MetodosAxios.instanceAxios.delete(`/organizations/${id}/`, { data: { } });
    }
    
    // PLANES
    static obtener_planes = () => {
        return MetodosAxios.instanceAxios.get(`/plans/`);
    }

    static crear_plan = (plan) => {
        console.log('recibo plan', plan);
        return MetodosAxios.instanceAxios.post(`/plans/`, plan);
    }

    static editar_plan = (plan) => {
        console.log('recibo plan', plan);
        return MetodosAxios.instanceAxios.put(`/plans/${plan.id}/`, plan);
    }

    static eliminar_plan = (id) => {
        console.log('recibo id', id);
        return MetodosAxios.instanceAxios.delete(`/plans/${id}/`, { data: { } });
    }

    // SOFTWARE
    static obtener_softwares = () => {
        return MetodosAxios.instanceAxios.get(`/softwares/`);
    }

    //   static obtener_autores = () => {
    //       return MetodosAxios.instanceAxios.get('/autores/');
    //   }

    //   static obtener_libroautores = () => {
    //       return MetodosAxios.instanceAxios.get('/libroautores/');
    //   }

    //   static obtener_libros = () => {
    //       return MetodosAxios.instanceAxios.get('/libros/');
    //   }

    //   static obtener_libros_calificados = () => {
    //       return MetodosAxios.instanceAxios.get('/calificaciones/');
    //   }
    //   static obtener_historico = (nombre_autor) => {
    //       return MetodosAxios.instanceAxios.get(`/historico/${nombre_autor}`);
    //   }
}