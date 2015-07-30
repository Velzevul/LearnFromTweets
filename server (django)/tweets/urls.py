from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
]