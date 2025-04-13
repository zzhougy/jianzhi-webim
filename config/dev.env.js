'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const fs = require('fs')
const path = require('path')

// 读取.env.development文件
const envPath = path.resolve(__dirname, '../.env.development')
const envConfig = {}
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      if (key && !key.startsWith('#')) {
        envConfig[key] = `"${value}"`
      }
    }
  })
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ...envConfig
})
