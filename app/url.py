from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name = 'home'),
    path("signin/", views.signin, name = "signin"),
    path("signup/", views.signup, name="signup"),
    path("netflix/", views.netflix, name = 'netflix'),
    path('payment/', views.payment, name = 'payment'),
    path('success/<str:args>/', views.success, name = 'success')
    
]
