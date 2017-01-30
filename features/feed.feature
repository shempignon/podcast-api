Feature: Feed
  In order to manage feeds, a user should be able to:
  - create a new feed
  - refresh a feed
  - delete a feed

  Scenario Outline: Create a feed
#    Given data are loaded
    When the user "POST" <params> to the "/feeds" path
    Then the user should get a <code> response

    Examples:
    | params                                                                          | code  |
    | '{"name": "Laravel Podcast", "url": "http://simplecast.com/podcasts/351/rss"}'  | 201   |
    | '{"name": "Laravel Podcast", "url": "fake url"}'                                | 400   |