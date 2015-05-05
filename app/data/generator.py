from datetime import datetime, timedelta
from dateutil import rrule
from random import randint, random
from json import dump, load
from faker import Factory
from collections import Counter


def saveJson(data, filename):
    with open('{0}.json'.format(filename),'w') as f:
        dump(data, f, indent='    ')

def generateActivity():
    now = datetime.now()
    initial_date = now - timedelta(days=1)
    authors = load(open('authors.json'))
    domain = []
    activity = {
        'total': []
    }

    for author in authors:
        activity[author['name']] = []

    for dt in rrule.rrule(rrule.HOURLY, dtstart=initial_date, until=now):
        domain.append(str(dt))
        n_tweets = randint(0,10)
        activity['total'].append({
            'time': str(dt),
            'nTweets': n_tweets
        })

        tweet_authors = []
        for i in range(n_tweets):
            random_author = authors[randint(0,len(authors)-1)]
            tweet_authors.append(random_author['name'])

        authors_counter = Counter(tweet_authors)

        for author in authors:
            author_tweets = 0

            if author['name'] in authors_counter.keys():
                author_tweets = authors_counter[author['name']]

            activity[author['name']].append({
                'time': str(dt),
                'nTweets': author_tweets
            })

    return domain, activity

def getMenuItems():
    def storeItemId(item, path):
        if path is None:
            item_id = item['label']
        else:
            item_id = path + '/' + item['label']

        try:
            for child in item['children']:
                storeItemId(child, item_id)
        except KeyError:
            item_ids.append(item_id)

    menu = load(open('menu.json'))
    item_ids = []

    for item in menu:
        storeItemId(item, None)

    return item_ids

def generateCommandPercentage():
    menu_items = getMenuItems()
    res = {}

    for item in menu_items:
        res[item] = random() * 100

    return res

def generateDummyTweets(activity):
    tweets = []
    menu_items = getMenuItems()
    authors = load(open('authors.json'))
    fake = Factory.create()

    for entry in activity:
        for i in range(entry['nTweets']):
            random_author = authors[randint(0,len(authors)-1)]
            random_menu_item = menu_items[randint(0,len(menu_items)-1)]

            tweet = { 'author': random_author,
                      'commandId': random_menu_item,
                      'published': entry['time'],
                      'text': fake.sentence() }

            tweets.append(tweet)


    return tweets

def main():
    domain, activity = generateActivity()
    saveJson(domain, 'domain')
    saveJson(activity, 'activity')

    tweets = generateDummyTweets(activity['total'])
    saveJson(tweets, 'tweets')

    command_vocabulary = generateCommandPercentage()
    saveJson(command_vocabulary, 'commandVocabulary')

    command_relevancy = generateCommandPercentage()
    saveJson(command_relevancy, 'commandRelevancy')
