from django.db import models
from django.utils import timezone

class Author(models.Model):
    screen_name = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=50)
    profile_image_url = models.URLField()

    def __str__(self):
        return self.screen_name

class Tweet(models.Model):
    id = models.BigIntegerField(primary_key=True)
    created_at = models.DateTimeField()
    favorite_count = models.IntegerField()
    retweet_count = models.IntegerField()
    text = models.CharField(max_length=255)
    author = models.ForeignKey(Author, db_column='author_screen_name')
    # retweet_authors = models.ManyToManyField(Author)
    # original_tweet = models.ForeignKey('self')
    # commands
    # preview_image_url
    # entities (?)

    def __str__(self):
        return self.text

    def recent(hrs=None):
        if hrs is None:
            hrs = 288 # week

        return self.pub_date >= timezone.now() - datetime.timedelta(hours=hrs)

def makeTweet(api_response):
    tweet = Tweet(
        id = api_response.id,
        created_at = api_response.created_at,
        favorite_count = api_response.favorite_count,
        retweet_count = api_response.retweet_count
    )
