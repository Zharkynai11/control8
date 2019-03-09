from django.db import models

class Task(models.Model):
    STATUSES = (("очередь","очередь"), ("в работе","в работе"), ("сделано","сделано"))
    summary = models.CharField(max_length=50,verbose_name="Краткое описание")
    description = models.TextField(max_length=5000, blank=True,null=True,verbose_name="Полное описание")
    due_date = models.DateTimeField(blank=False, null=False,verbose_name="Срок выполнения")
    status = models.CharField(max_length=10,blank=False,null=False,choices=STATUSES,default="очередь",verbose_name="Статус")
    time_planned = models.DecimalField(blank=True,null=True,decimal_places=1,max_digits=5,verbose_name="Планируемое время")

# Create your models here.
