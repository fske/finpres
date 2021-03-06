var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var _ = require('underscore');
var User = require('../models/user.js');
var Analysis = require('../models/analysis.js');

router.get('/', function (req, res) {
//  res.render('index', {
//    title: '主页'
//  });
//  res.redirect("api.pre.ucloudadmin.com");
  res.render("http:/api.pre.ucloudadmin.com", req);
});

router.get('/reg', checkNotLogin);
router.get('/reg', function (req, res) {
  res.render('register', {
    title: '注册'
  });
});

router.post('/reg', checkNotLogin);
router.post('/reg', function (req, res) {
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致!'); 
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
  });
  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if (user) {
      req.flash('error', '用户已存在!');
      return res.redirect('/register');
    }
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/register');
      }
      req.session.user = user;
      req.flash('success', '注册成功!');
      res.redirect('/');
    });
  });
});

router.get('/login', checkNotLogin);
router.get('/login', function (req, res) {
  res.render('login', {
    title: '登录'
  }); 
});

router.post('/login', checkNotLogin);
router.post('/login', function (req, res) {
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  User.get(req.body.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!'); 
      return res.redirect('/login');
    }
    if (user.password != password) {
      req.flash('error', '密码错误!'); 
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登陆成功!');
    res.redirect('/');
  });
});

router.get('/post', checkLogin);
router.get('/post', function (req, res) {
  res.render('post', {
    title: '发表',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/post', checkLogin);
router.post('/post', function (req, res) {
});

router.get('/logout', checkLogin);
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!'); 
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session != undefined && req.sesstion.user != undefined) {
    req.flash('error', '已登录!'); 
    res.redirect('back');
  }
  next();
}

router.get('/show', function(req, res) {
  res.render('p_p_m',{});
});

router.get('/data', function(req, res) {
  Analysis.get(function(err, result) {
    res.send(result);
  });
});

module.exports = router;
