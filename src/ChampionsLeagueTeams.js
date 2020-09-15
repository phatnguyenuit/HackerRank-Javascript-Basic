const https = require('https');

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const getAPIURL = (year, page) => {
  return `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
};

const getFootballMatches = (year, page) => {
  const url = getAPIURL(year, page);
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((jsonRespone) => resolve(jsonRespone))
      .catch((e) => reject(e.message));
  });
};

async function getTeams(year, k) {
  // write your code here
  // API endpoint template: https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=<YEAR>&page=<PAGE_NUMBER>
  const matchesPerTeam = {};
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const { total_pages, data: matches } = await getFootballMatches(year, page);

    matches.forEach(({ team1, team2 }) => {
      matchesPerTeam[team1] = (matchesPerTeam[team1] || 0) + 1;
      matchesPerTeam[team2] = (matchesPerTeam[team2] || 0) + 1;
    });
    totalPages = total_pages;
    page += 1;
  }
  return Object.entries(matchesPerTeam)
    .filter(([, numOfMatches]) => numOfMatches >= k)
    .map(([team]) => team)
    .sort();
}

function main(year, k) {
  getTeams(year, k)
    .then((result) => console.log(result))
    .catch((e) => console.error(e.message));
}

main(2015, 6);
