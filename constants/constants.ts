

    export const DESIGNATION_TYPES  = [
        {key:'1', value:'Aalim'},
        {key:'2', value:'Hafiz'},
        {key:'3', value:'Muazzan'},
    ]

    export const DESIGTYPES  = [
        {key:'1', value:'Muazzan'},
        {key:'2', value:'User'},
    ]

    export const ROLETYPES  = [
        {key:'1', value:'Sub Admin'},
        {key:'2', value:'User'},
    ]

    export const SERVER_URL=process.env.EXPO_PUBLIC_SERVER_URL;


    export const POST_CREATE_ACCOUNT=`${SERVER_URL}/auth/signup`;
    export const POST_LOGIN_USER = `${SERVER_URL}/auth/login`;
    export const GET_USER_PROFILE=`${SERVER_URL}/auth/spatial/`;
    export const PUT_USER_PROFILE=`${SERVER_URL}/auth/spatial/`;
    export const POST_UPLOAD_IMAGE=`${SERVER_URL}/upload/image`;
    export const GET_SUB_ADMIN=`${SERVER_URL}/auth/user/subadmin/`;
    export const GET_REGULAR_USERS=`${SERVER_URL}/auth/user/`;
    export const GET_MY_ADMIN=`${SERVER_URL}/auth/admin/`;
    export const POST_ADD_USER=`${SERVER_URL}/auth/user/add`;
    export const POST_REMOVE_USER=`${SERVER_URL}/auth/admin/`;

