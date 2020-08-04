var express = require('express')
var server = require('./server')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('login.html')
}
)

router.post('/', server.login)

router.post('/adminLogin', server.admlogin)

router.post('/admin/addstu', server.addstu)

router.post('/admin/addtch', server.addtch)

router.post('/admin/csxs', server.csxs)

router.get('/student', function (req, res) {
  res.render('student.html')
})

module.exports = router
