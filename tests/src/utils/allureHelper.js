import * as allure from 'allure-js-commons';

export class AllureHelper {
  /**
   * Universal Metadata Setter
   * @param {Object} options
   */
  static async apply(options) {
    const {
      owner,
      severity,
      tags = [],
      layer,
      epic,
      feature,
      story,
      description,
      qaseId,
    } = options;

    if (owner) await allure.owner(owner);
    if (severity) await allure.severity(severity);
    if (layer) await allure.layer(layer);
    if (epic) await allure.epic(epic);
    if (feature) await allure.feature(feature);
    if (story) await allure.story(story);
    if (description) await allure.description(description);

    for (const tag of tags) {
      await allure.tag(tag);
    }

    if (qaseId) {
      await allure.link(`${process.env.QASE_URL}/${qaseId}`);
    }
  }
}
