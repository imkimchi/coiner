export default [
    {
        type: 'list',
        name: 'exchange',
        message: 'Menu:',
        choices: ['Charts', 'Trading', 'Wallet', 'Chat'],
        filter: val => val.toLowerCase()    
    }
]