function staticIndex(req, res) {
  return res.render('index');
}

function staticLogin(req, res) {
  return res.render('login');
}

function staticRegister(req, res) {
  return res.render('register');
}



module.exports = {
  index: staticIndex,
  login: staticLogin,
  register: staticRegister
};