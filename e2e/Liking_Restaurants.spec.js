/* eslint-disable no-unused-vars */
// const {async} = require('regenerator-runtime');
const assert = require('assert');

Feature('Liking Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({I}) => {
  I.seeElement('#restaurants');
  I.see('Favorite Restaurants is empty.', '#restaurants');
});

Scenario('liking one movie', async ({I}) => {
  I.see('Favorite Restaurants is empty.', '#restaurants');

  I.amOnPage('/');
  I.waitForElement('.name-resto', 5);
  I.seeElement('.name-resto');
  const firstResto = locate('.name-resto a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.name-resto');
  const likedRestoName = await I.grabTextFrom('.name-resto a');
  assert.strictEqual(firstRestoName, likedRestoName);
});


Scenario('unliking one movie', async ({I}) => {
  I.amOnPage('/');

  I.waitForElement('.name-resto', 5);
  I.seeElement('.name-resto');
  const firstResto = locate('.name-resto a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstRestoName);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.name-resto', 5);
  I.seeElement('.name-resto');
  const likedRestoName = await I.grabTextFrom('.name-resto a');
  I.click(likedRestoName);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('#restaurants');
  I.dontSeeElement('.name-resto');
  I.dontSeeElement('.name-resto a');
});

