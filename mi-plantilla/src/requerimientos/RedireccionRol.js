export default class RedireccionRol {
    static redirectLogin = (history, perfil) =>{
    	// si es tutor (con id 1), etonces se redirige hacia la ruta 
    	// localhost:3000/administracion/usuarios
        if(perfil===1){
            history.push('/representante/tutores-disponibles/');
        }
        // si es representante (com id 2), entonces se redirige hacia la ruta
        // localhost:3000/superadmin/planes
        else if(perfil===2){
            history.push('/representante/tutores-disponibles/');
        }else if(perfil===3){
            history.push('/administracion/');
        }
    }
}