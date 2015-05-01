from datetime import datetime, timedelta
from dateutil import rrule
from random import randint
from json import dump, load
from faker import Factory


def saveJson(data, filename):
    with open('{0}.json'.format(filename),'w') as f:
        dump(data, f, indent='    ')

def generateActivity():
    now = datetime.now()
    initial_date = now - timedelta(days=2)
    result = []

    for dt in rrule.rrule(rrule.HOURLY, dtstart=initial_date, until=now):
        result.append({ 'time': str(dt),
                        'n_tweets': randint(0, 10) })

    return result

def generateDummyTweets(activity):
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

    tweets = []
    menu_items = getMenuItems()
    authors = load(open('authors.json'))
    fake = Factory.create()

    for entry in activity:
        for i in range(entry['n_tweets']):
            random_author = authors[randint(0,len(authors)-1)]
            random_menu_item = menu_items[randint(0,len(menu_items)-1)]

            tweet = { 'author': random_author,
                      'commandId': random_menu_item,
                      'published': entry['time'],
                      'text': fake.sentence() }

            tweets.append(tweet)


    return tweets

def main():
    activity = generateActivity()
    saveJson(activity, 'activity')

    tweets = generateDummyTweets(activity)
    saveJson(tweets, 'tweets')
