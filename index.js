import clear from 'clear'
import chalk from 'chalk'
import figlet from 'figlet'
import commander from 'commander'
import inquirer from 'inquirer'
import {Spinner} from 'clui'
import rp from 'request-promise'
import prettyjson from 'prettyjson'
//import blessed from 'blessed'
import R from 'ramda'

import initQuest from './lib/initQuest'
import menuQuest from './lib/menuQuest'


clear()
console.log(chalk.yellow(figlet.textSync('Coiner', {horizontalLayout: 'full'})))

startApp()

function getUserInfo (token) {
    return {
        url: "https://api.korbit.co.kr/v1/user/info",
        headers: `Authorization: Bearer ${token}`
    }
}

function showMenu (choice) {
    let fn = R.cond([
        [R.equals('Chart'), chart()], [R.equals('Trading'), trading()],
        [R.equals('Wallet'), wallet()], [R.equals('Chat'), chat()]
    ])

}


function getAccessToken (info) {
    return {
        url: "https://api.korbit.co.kr/v1/oauth2/access_token",
        body: {
            client_id: info.app_id,
            clinet_secret: info.app_secret,
            username: info.username,
            password: info.password
        }
    }
}

async function startApp() {

    let loginInfo = await inquirer.prompt(initQuest)
    let status = new Spinner(chalk.bold(`Authenticating you to ${loginInfo.exchange}, please wait...`))
    status.start()

    let tokenOption = getAccessToken(loginInfo)
    let accessToken = await rp(tokenOption)
    let InfoOption = getUserInfo(accessToken)
    let UserInfo = await rp(InfoOption)
    status.stop()

    log(`Successfully Logged into ${loginInfo.exchange}!`)
    log(prettyjson.render(UserInfo))

    let menu = await inquirer.prompt(menuQuest)
    showMenu(menu)
}