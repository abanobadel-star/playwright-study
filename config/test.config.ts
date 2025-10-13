export const testConfig = {
    loginCredentials: {
        validUser: {
            username: 'tomsmith',
            password: 'SuperSecretPassword!'
        },
        invalidUser: {
            username: 'invalid_user',
            password: 'invalid_password'
        },
        emptyCredentials: {
            username: '',
            password: ''
        },
        mixedCredentials: {
            validUsername: 'tomsmith',
            invalidPassword: 'wrongpassword',
            invalidUsername: 'wronguser',
            validPassword: 'SuperSecretPassword!'
        },
        specialCharacters: {
            username: '!@#$%^&*()',
            password: '!@#$%^&*()'
        },
        longCredentials: {
            username: 'a'.repeat(100),
            password: 'a'.repeat(100)
        }
    }
};