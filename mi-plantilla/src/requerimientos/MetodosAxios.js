import axios from 'axios';

export default class MetodosAxios {
  static instanceAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  static obtener_tutores = () => {
    return MetodosAxios.instanceAxios.get(`/tutores/`);
  }
}