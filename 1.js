#!/usr/bin/node

const crypto = require("crypto")

function quit(errorInfo) {
    console.error(`\x1b[31m${errorInfo}\x1b[0m`)
    console.log("用法：genpasswd <input-text> [password-length]")
    process.exit()
}

function getInput() {
    // 判断参数数量
    argumentsLength = process.argv.length
    if (argumentsLength < 3) {
        quit("参数不足")
    } else if (argumentsLength > 4) {
        quit("参数过多")
    } else if (!!process.argv[3] && isNaN(process.argv[3])) {
        // 判断输入的密码长度是否是数字
        quit("密码长度应为数字")
    } else {
        return process.argv[2]
    }
}

function hashText() {
    // 计算哈希值并以十六进制编码输出
    const hash = crypto.createHash("sha1")
    hash.update(getInput())
    return hash.digest("hex")
}

function baseFormat(string) {
    formatObj = {
        "a": "@",
        "b": "#",
        "c": "$",
        "d": "%",
        "e": "&",
        "f": "_"
    }
    let result = string
    for (i in formatObj) {
        result = result.replaceAll(i, formatObj[i])
    }
    console.log(result.slice(0, parseInt(process.argv[3]) || 6))
}

baseFormat(hashText())