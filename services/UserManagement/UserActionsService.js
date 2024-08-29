'use strict';

const OrganisationRestApiModel = require('../../models/OrganisationRestApiModel');

class UserActionsService {

  /**
   * Calls the IAM REST API with the given options and returns results as a Promise.
   *
   // * @returns {Promise<string>}
   */

  static async deleteRequest(options) {
    return await new Promise((resolve, reject) => {
      const model = new OrganisationRestApiModel({}, options);
      model.delete((err, data, _responseTime) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  static async postRequest(options) {
    return await new Promise((resolve, reject) => {
      const model = new OrganisationRestApiModel({}, options);
      model.save((err, data, _responseTime) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = UserActionsService;
