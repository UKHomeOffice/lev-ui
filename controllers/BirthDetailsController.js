'use strict';

const BirthController = require('./BirthController');
const { searchById } = require('../api');

class BirthDetailsController extends BirthController {
  locals(req, res, callback) {
    super.locals(req, res, async (error, locals) => {
      if (error) return callback(error);

      const searchResults = req.sessionModel.get('searchResults') || [];
      let record;

      // If id param exists, use it to find record
      if (req.params.id) {

        // Check if searchResults contains systemNumber
        const systemNumber = parseInt(req.params.id);
        const currentRecord = searchResults.findIndex(record => record.id === systemNumber);

        if (currentRecord !== -1) {

          // Record found in searchResults, use it
          req.sessionModel.set('currentRecord', currentRecord);

          record = searchResults[currentRecord];
        } else {

          // Record not found in searchResults, call REST API
          record = await searchById({
            ...this.getOptions(req),
            url: `/v1/registration/birth/${systemNumber}`
          });
        }
      } else {

        // No id param exists, display currentRecord
        const currentRecord = req.sessionModel.get('currentRecord');
        record = searchResults[currentRecord];
      }

      if (record) {
        locals.record = this.processRecord(record);
        locals.showBackToResults = searchResults.length > 1;

        callback(null, locals);
      } else {
        callback(this.pageNotFound());
      }
    });
  }
}

module.exports = BirthDetailsController;
