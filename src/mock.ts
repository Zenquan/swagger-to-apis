import express from 'express'
import Mock from 'mockjs'
import chalk from 'chalk'
import os from 'os'

function getLocalIP() {
  const interfaces:any = os.networkInterfaces();

  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // console.log('Local IP Address:', iface.address);
        return iface.address
      }
    }
  }
};

const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(JSON.stringify(data, null, 10))
})

app.listen(port, () => {
  console.log(chalk.green(` - Local:            http://localhost:${port}  `))
  console.log(chalk.green(` - On Your Network:  http://${getLocalIP()}:${port}  `))
})
