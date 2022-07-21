const ENVIROMENT: string = 'DEV';

let MAIN_PATH_NET = 'https://localhost:3061/api/configurador/';

let MAIN_PATH_AUTH = '';
let MAIN_PATH_ROLE = ''
switch (ENVIROMENT) {
  case 'DEV':
    // MAIN_PATH_AUTH = 'http://b2bsecurityservice.indratools.com/aut/seguridad';
    MAIN_PATH_AUTH = 'http://seguridadweb.indratools.com/aut/seguridad';
    MAIN_PATH_ROLE = 'http://seguridadweb.indratools.com/aut/seguridad'
    break;
  case 'QA':
    MAIN_PATH_AUTH = '';
    break;
  case 'PROD':
    // MAIN_PATH = 'https://hades-back.azurewebsites.net'
    break;
  default:
    break;
}

export const API_AUTH_SESSION = MAIN_PATH_AUTH + '/login';
export const API_ROLE = MAIN_PATH_AUTH + '/userRol';

// REGISTRO
export const API_REG1 = MAIN_PATH_NET + 'ExecuteQuery';
