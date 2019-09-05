import axios from 'axios';

export default class MetodosAxios {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static obtener_tutores = () => {
    return MetodosAxios.instanceAxios.get(`/tutores/`);
  }
  static login_tutor = correo => {
    return MetodosAxios.instanceAxios.get(`/tutores/${correo}`);
  }
  static login_representante = correo => {
    return MetodosAxios.instanceAxios.get(`/representantes/${correo}`);
  }
  static obtener_materias = cedula => {
    return MetodosAxios.instanceAxios.get(`/asignaturas/${cedula}`);
  }
  static editar_representante = representante => {
    return MetodosAxios.instanceAxios.put(`/representantes/${representante.id}`, representante);
  }
  static editar_tutor = tutor => {
    return MetodosAxios.instanceAxios.put(`/tutores/${tutor.id}`, tutor);
  }
  static obtener_asignaturas = () => {
    return MetodosAxios.instanceAxios.get(`/asignaturas/`);
  }
  static obtener_formacion_tutor = id_tutor => {
    return MetodosAxios.instanceAxios.get(`/formaciontutores/${id_tutor}`);
  }
  static obtener_asignaturas_tutor = id_tutor => {
    return MetodosAxios.instanceAxios.get(`/asignaturas/${id_tutor}`);
  }
  static obtener_representante = correo => {
    return MetodosAxios.instanceAxios.get(`/representantes/${correo}`);
  }
  static obtener_tutor = id => {
    return MetodosAxios.instanceAxios.get(`/tutores/${id}`);
  }
  static editar_formacion_tutor = formacion_tutor => {
    return MetodosAxios.instanceAxios.put(`/formaciontutores/${formacion_tutor.id_tutor}`, formacion_tutor);
  }
  static crear_representante = representante => {
    return MetodosAxios.instanceAxios.post(`/representantes/`, representante);
  }
  static obtener_representantes = () => {
    return MetodosAxios.instanceAxios.get(`/representantes/`);
  }
  static eliminar_representante = id => {
    return MetodosAxios.instanceAxios.delete(`/representantes/${id}`, { data: { } } );
  }
}