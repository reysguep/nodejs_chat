const path = require('path');
const rootDir = require('../util/path');

exports.get404 = (req, res) => {
    res.status(404).render(path.join(rootDir, 'views', 'errors', '404'), {path: '/404'});
};

exports.get401 = (req, res) => {
    res.status(401).render(path.join(rootDir, 'views', 'errors', '401'), {path: '/401'});
};