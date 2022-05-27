const ENVIROMENT:string = "DEV";

let MAIN_PATH_JS = 'http://localhost:3000';

let MAIN_PATH = '';

switch (ENVIROMENT) {
  case 'DEV':
    MAIN_PATH = 'http://b2bsecurityservice.indratools.com/aut/seguridad';
    break;

    case 'QA':
    MAIN_PATH = ''
    break;

    case 'PROD':
    MAIN_PATH = ''
    break;

  default:
    break;
}


export const API_MENU = MAIN_PATH_JS + '/menu';
export const API_AUTH_SESSION = MAIN_PATH + '/login'


//VACANTES
export const API_VAC_DETAILS    =  MAIN_PATH + "/vacancies/detail";
