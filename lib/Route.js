'use strict';

const groupLocation = (data) => {
  const locBase = {};
  data.forEach((reward) => {
    if (!locBase[reward.place]) {
      locBase[reward.place] = {
        rewards: [],
      };
    }
    const slimmed = Object.assign({}, reward);
    delete slimmed.place;
    locBase[reward.place].rewards.push(slimmed);
  });
  return locBase;
};

class Route {
  constructor(route, deps) {
    this.route = route;
    this.deps = deps;
    this.logger = deps.logger;
    this.dropCache = deps.dropCache;
    this.wfKeys = deps.wfKeys;
    this.platforms = deps.platforms;
    this.setHeadersAndJson = deps.setHeadersAndJson;
    this.warframeData = deps.warframeData;
    this.solKeys = deps.solKeys;
    this.items = [
      'news',
      'events',
      'alerts',
      'sortie',
      'syndicateMissions',
      'fissures',
      'globalUpgrades',
      'flashSales',
      'invasions',
      'darkSectors',
      'voidTrader',
      'dailyDeals',
      'simaris',
      'conclaveChallenges',
      'persistentEnemies',
      'cetusCycle',
      'constructionProgress',
      'earthCycle',
      'timestamp',
    ];
    if (!this.wfKeys.includes('weapons')) {
      this.wfKeys.push('weapons');
    }
    if (!this.wfKeys.includes('warframes')) {
      this.wfKeys.push('warframes');
    }

    this.groupLocation = groupLocation;
  }

  async handle(req, res) {
    this.logger.log('silly', `Got ${req.originalUrl}`);
    this.setHeadersAndJson(res, [].concat(this.wfKeys).concat(['pc', 'ps4', 'xb1', 'heartbeat']));
  }
}

module.exports = Route;
