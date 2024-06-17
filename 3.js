#!/usr/bin/node

"use strict"
const crypto = require("crypto")
let passwordLength

function quit(errorInfo) {
    console.error(`\x1b[31m${errorInfo}\x1b[0m`)
    console.log("用法：genpasswd <输入内容> [密码长度 (默认20)]")
    process.exit()
}

function getInput() {
    const argumentsLength = process.argv.length
    // 判断参数数量
    if (argumentsLength < 3) {
        quit("参数不足")
    } else if (argumentsLength > 4) {
        quit("参数过多")
    } else {
        if (!!passwordLength && isNaN(passwordLength)) {
            // 判断输入的密码长度是否是数字
            quit("密码长度应为数字")
        } else {
            // 若未指定长度，则设长度为20
            passwordLength = !!process.argv[4] ? parseInt(process.argv[3]) : 20
            if (passwordLength < 7) {
                quit("密码太短")
            } else {
                return process.argv[2]
            }
        }
    }
}

function hashText() {
    // 计算哈希值并以十六进制编码输出
    const hash = crypto.createHash("sha1")
    hash.update(getInput())
    // 返回数组，前后两半
    const data = hash.digest("hex").slice(0, passwordLength)
    const flag = parseInt(passwordLength / 2) + 1
    return [data.slice(0, flag), data.slice(flag)]
}

function baseFormat(array) {
    // 0-5数字转符号
    const formatObj = ["@", "#", "$", "%", "&", "_"]
    let result = array
    for (let i in result) {
        for (let j in formatObj) {
            result[i] = result[i].replaceAll(j, formatObj[j])
        }
    }
    console.log(result[0].toUpperCase() + result[1])
}

baseFormat(hashText())
