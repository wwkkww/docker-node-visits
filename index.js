const express = require('express')
const redis = require('redis')
const process = require('process')

const app = express()
const client = redis.createClient({
  // NOTE: node-app use host name ("redis-server") to connect services together
  host: 'redis-server',
  post: 6379,
})
client.set('visits', 0)

app.get('/', (req, res) => {
  // exit(0): status code 0 => exited and everything is ok
  // exit 1,2,3... etc : exited because something went wrong
  // process.exit(0)
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits)
    client.set('visits', parseInt(visits) + 1)
  })
})

app.get('/status', (req, res) => res.send({ status: "I'm alive!" }))

app.listen(4000, () => {
  console.log('Server started on port 4000')
})
