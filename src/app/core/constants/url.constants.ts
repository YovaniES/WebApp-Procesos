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
    // MAIN_PATH = 'https://hades-back.azurewebsites.net'
    break;

  default:
    break;
}


export const API_MENU = MAIN_PATH_JS + '/menu';
export const API_AUTH_SESSION = MAIN_PATH + '/login'

// REGISTRO
export const API_REG = MAIN_PATH_JS + '/registro'


// VACANTES
export const API_VAC_DETAILS    =  MAIN_PATH + "/vacancies/detail";
export const API_VAC_GETALL     =  MAIN_PATH + "/vacancies/getall";
export const API_VAC_REQUEST    =  MAIN_PATH + "/vacancies/request";
export const API_VAC_UPDSTATUS  =  MAIN_PATH + "/vacancies/updatestatus";
export const API_VAC_UPDATE     =  MAIN_PATH + "/vacancies/update";
export const API_VAC_SEARCHPO   =  MAIN_PATH + "/vacancies/searchposition";
export const API_VAC_TOAPROBE   =  MAIN_PATH + "/vacancies/toaprobe";
export const API_VAC_UPLOAD     =  MAIN_PATH + "/vacancies/azure/upload";
export const API_VAC_UPLOADTOREQ =  MAIN_PATH + "/vacancies/azure/uploadlater";
export const API_VAC_DOWNLOAD   =  MAIN_PATH +"/vacancies/azure/download";
export const API_VAC_DOWNALL  =  MAIN_PATH +"/vacancies/azure/allfiles";
export const API_VAC_DELETEFILE  =  MAIN_PATH + "/vacancies/azure/delete";
