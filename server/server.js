var db = require('./mysql/db')

exports.login = (req, res) => {
  var loginForm = req.body.loginForm
  var stuSql = 'SELECT * FROM students where id=? and password=? and jobid=?'
  var tchSql = 'SELECT * FROM teachers where id=? and password=? and jobid=?'
  var data = [loginForm.id, loginForm.password, loginForm.jobid]
  if (loginForm.jobid === '0') {
    db.base(stuSql, data, (response) => {
      if (response.length === 0) {
        res.json({
          status: 0,
          msg: '无此结果',
          result: ''
        })
      } else {
        res.json({
          status: 1,
          msg: '查询成功',
          result: response[0]
        })
      }
    }
    )
  } else {
    db.base(tchSql, data, (response) => {
      if (response.length === 0) {
        res.json({
          status: 0,
          msg: '无此结果',
          result: ''
        })
      } else {
        res.json({
          status: 2,
          msg: '查询成功',
          result: response[0]
        })
      }
    }
    )
  }
}

exports.admlogin = (req, res) => {
  var loginForm = req.body.loginForm
  var sql = 'SELECT * FROM admin where id=? and password=?'
  var data = [loginForm.id, loginForm.password]
  db.base(sql, data, (response) => {
    if (response.length === 0) {
      res.json({
        status: 0,
        msg: '无此结果',
        result: ''
      })
    } else {
      res.json({
        status: 1,
        msg: '查询成功',
        result: response[0]
      })
    }
  }
  )
}

exports.addstu = (req, res) => {
  var stuForm = req.body.stuForm
  var addstu = 'INSERT INTO students VALUES(?,?,?,?,?,?,?,?,?,?)'
  var stusql = 'SELECT * FROM students where id=?'
  var data = [stuForm.id, stuForm.name, stuForm.lever, stuForm.class, stuForm.age, stuForm.sex, stuForm.birth, stuForm.phonenum, stuForm.password, stuForm.jobid]
  db.base(stusql, stuForm.id, (response) => {
    if (response.length !== 0) {
      res.json({
        status: 0,
        msg: '添加失败',
        result: ''
      })
    } else {
      if (data.indexOf('') !== -1) {
        res.json({
          status: 1,
          msg: '添加失败',
          result: ''
        })
      } else {
        db.base(addstu, data, (response) => {
          res.json({
            status: 2,
            msg: '添加成功',
            result: response[0]
          })
        })
      }
    }
  })
}

exports.addtch = (req, res) => {
  var tchForm = req.body.tchForm
  var addtch = 'INSERT INTO teachers VALUES(?,?,?,?,?,?,?,?,?,?,?)'
  var tchsql = 'SELECT * FROM teachers where id=?'
  var data = [tchForm.id, tchForm.name, tchForm.lever, tchForm.class, tchForm.subject, tchForm.age, tchForm.sex, tchForm.birth, tchForm.phonenum, tchForm.password, tchForm.jobid]
  db.base(tchsql, tchForm.id, (response) => {
    if (response.length !== 0) {
      res.json({
        status: 0,
        msg: '添加失败',
        result: ''
      })
    } else {
      if (data.indexOf('') !== -1) {
        res.json({
          status: 1,
          msg: '添加失败',
          result: ''
        })
      } else {
        db.base(addtch, data, (response) => {
          res.json({
            status: 2,
            msg: '添加成功',
            result: response[0]
          })
        })
      }
    }
  })
}

exports.csxs = (req, res) => {
  var schForm = req.body.schForm
  var stusql = 'SELECT * FROM students where id=? and name=?'
  var data = [schForm.id, schForm.name]
  // eslint-disable-next-line comma-spacing
  db.base(stusql,data, (response) => {
    if (response.length === 0) {
      res.json({
        status: 0,
        msg: '无此数据',
        result: ''
      })
    } else {
      res.json({
        status: 1,
        msg: '查询成功',
        result: response
      })
      console.log(response)
    }
  })
}
