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
    return MetodosAxios.instanceAxios.put(`/representantes/create/${representante.id}`, representante);
  }
  static editar_tutor = tutor => {
    return MetodosAxios.instanceAxios.put(`/tutores/create/${tutor.id}`, tutor);
  }
}