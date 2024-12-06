'use strict';

const { Controller } = require('hmpo-form-wizard');
const requestOptions = require('../helpers/requestOptions');

class BaseController extends Controller {

  getOptions(req) {
    return requestOptions(req)
  }

  pageNotFound() {
    const err = new Error('Page not found');
    err.code = 'PAGE_NOT_FOUND';
    err.template = 'errors/page-not-found';
    err.status = 404;

    return err;
  }

  hasRole(req, role) {
    const roles = req.headers['x-auth-roles'];

    return roles && roles.includes(role);
  }

  getGroups(req) {
    const groups = req.headers['x-auth-groups'];

    return groups ? groups.split(',') : [];
  }
}

module.exports = BaseController;
