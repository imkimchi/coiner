export default [
    {
        type: 'list',
        name: 'exchange',
        message: 'Which exchange do you want to use:',
        choices: ['Korbit', 'Coinone', 'Bithumb'],
        filter: val => val.toLowerCase()
    },
    {
        type: 'input',
        name: 'app_id',
        message: "What's your API key"
    },
    {
        type: 'input',
        name: 'app_secret',
        message: "What's your API Secret:"
    },
    {
        type: 'input',
        name: 'username',
        message: "What's your email:"
    },
    {
        type: 'password',
        name: 'password',
        message: "What's your password:"
    }
]