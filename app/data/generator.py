from datetime import datetime, timedelta
from dateutil import rrule
from random import randint, random
from json import dump, load
from faker import Factory
from collections import Counter


TWEETS_HISTORY = 12
TWEETS_PER_HOUR = 5


def saveJson(data, filename):
    with open('{0}.json'.format(filename),'w') as f:
        dump(data, f, indent='    ')


def getMenuItemIds():
    def storeItemId(item, path):
        if path is None:
            item_id = item['label']
        else:
            item_id = path + '/' + item['label']

        if 'children' in item.keys():
            for child in item['children']:
                storeItemId(child, item_id)
        else:
            item_ids.append(item_id)

    menu = load(open('menu.json'))
    item_ids = []

    for item in menu:
        storeItemId(item, None)

    return item_ids


def generateCommandPercentage():
    menu_items = getMenuItemIds()
    res = {}

    for item in menu_items:
        res[item] = random() * 100

    return res


def generateDummyTweets(history_hours, tweets_per_hour, command_relevancy, command_vocabulary):
    tweets = []
    domain = []

    fake = Factory.create()
    authors = load(open('authors.json'))
    menu_item_ids = getMenuItemIds()
    
    now = datetime.now()
    initial_date = now - timedelta(hours=history_hours)

    for dt in rrule.rrule(rrule.HOURLY, dtstart=initial_date, until=now):
        domain.append(str(dt.replace(minute=0, second=0)))

        n_tweets = randint(0, tweets_per_hour)
        tweet_minutes = [randint(0, 59) for i in range(n_tweets)]
        tweet_minutes.sort()

        for i in range(n_tweets):
            random_author = authors[randint(0, len(authors)-1)]
            random_menu_item_id = menu_item_ids[randint(0,len(menu_item_ids)-1)]
            time = dt.replace(minute=tweet_minutes[i])

            command = { 'id': random_menu_item_id,
                        'relevancy':  command_relevancy[random_menu_item_id],
                        'familiarity': command_vocabulary[random_menu_item_id] }

            tweet   = { 'author': random_author,
                        'command': command,
                        'published': str(time),
                        'text': fake.sentence() }

            tweets.append(tweet);

    return domain, tweets


def main():
    command_vocabulary = generateCommandPercentage()
    saveJson(command_vocabulary, 'commandVocabulary')

    command_relevancy = generateCommandPercentage()
    saveJson(command_relevancy, 'commandRelevancy')

    domain, tweets = generateDummyTweets(TWEETS_HISTORY, TWEETS_PER_HOUR, command_relevancy, command_vocabulary)
    saveJson(domain, 'domain')
    saveJson(tweets, 'tweets')


if __name__ == '__main__':
    main()