from django.views.decorators.csrf import csrf_exempt
from webapp.models import *
from rest_framework import viewsets
from api.serializers import *


# Базовый класс ViewSet, основанный на ModelViewSet,
# но с отключенной проверкой аутентификации, и не блокирующий запросы без токена.
class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []

"""
class MovieViewSet(NoAuthModelViewSet):
    queryset = Movie.objects.active().order_by('id')

    # Метод, который отвечает за то,
    # какой класс сериализатора будет использоваться при обработке запроса.
    # Если запрос сделан методом GET, т.е. запрос на просмотр фильма или списка фильмов,
    # то метод возвращает класс MovieDisplaySerializer (вывод фильмов с вложенными категориями),
    # иначе - MovieCreateSerializer (вывод и сохранение фильмов с категориями в виде списка id категорий).
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer

    # метод, который выполняет удаление объекта instance.
    # здесь он переопределён для "мягкого" удаления объектов -
    # вместо реального удаления объекта, меняется его свойство is_deleted на True.
    # сам фильм сохраняется в базе, но при этом помечается, как удалённый.
    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
"""

class TaskViewSet(NoAuthModelViewSet):
    queryset = Task.objects.order_by("status").order_by("-due_date")
    serializer_class = TaskSerializer
