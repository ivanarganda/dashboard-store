const authState = {
    session:JSON.parse(sessionStorage.getItem('auth')) || [],
    registerCredentials: [{
        name: '',
        email: '',
        password: '',
    }],
    loginCredentials: [{
        email: '',
        password: ''
    }]
}


const reducer = (estate = authState , action) => {
    if ( action.type === 'RECOVERY_SESSION' ){
        return {
            ...estate,
            session:action.payload
        }
    }
    return estate;
}

export default reducer;