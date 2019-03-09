from webapp.models import *
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api:task-detail')

    class Meta:
        model = Task
        fields = ('url', 'id', 'summary','description','due_date','status','time_planned')
