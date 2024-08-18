

    export const DESIGNATION_TYPES  = [
        {key:'1', value:'Aalim'},
        {key:'2', value:'Hafiz'},
        {key:'3', value:'Muazzan'},
    ]

    export const SERVER_URL='http://10.0.2.2:3001'


    export const POST_CREATE_ACCOUNT=`${SERVER_URL}/auth/signup`;
    export const POST_LOGIN_USER = `${SERVER_URL}/auth/login`;
    export const GET_USER_PROFILE=`${SERVER_URL}/auth/spatial/`;
