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
    return MetodosAxios.instanceAxios.get(`/historicos/${cedula}`);
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
  static obtener_tutores_menores_a_25 = () => {
    return MetodosAxios.instanceAxios.get(`/tutoresMenoresa25/`);
  }
  static obtener_tutores_entre_25_y_30 = () => {
    return MetodosAxios.instanceAxios.get(`/tutores25a30/`);
  }
  static obtener_tutores_entre_30_y_40 = () => {
    return MetodosAxios.instanceAxios.get(`/tutores30a40/`);    
  }
  static obtener_tutores_mayores_a_40 = () => {
    return MetodosAxios.instanceAxios.get(`/tutoresMayoresa40/`);
  }
  static enviar_correo = correo => {
    return MetodosAxios.instanceAxios.post(`/mail/`, correo);
  }
  static obtener_mejores = () => {
    return MetodosAxios.instanceAxios.get(`/diezMejores/`);
  }
  static obtener_costo_promedio_materias = () => {
    return MetodosAxios.instanceAxios.get(`/costoPromedioPorMaterias/`);
  }
}