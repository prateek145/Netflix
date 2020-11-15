from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.conf import settings
from django.urls import reverse
import stripe
stripe.api_key = settings.SECRET_KEY1

# Create your views here.

def home(request):
    return render(request, 'home.html')

def signup(request):
    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('payment')

    context = {"form":form}
    return render(request, 'signup.html', context)

def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            return redirect("netflix")
        else:
            messages.info(request, "Username or Password does not match !!!! \n Enter correct information or Signup.")

    return render(request, 'signin.html')


def netflix(request):
    return render(request, 'index.html')

def payment(request):
    
    if request.method == 'POST':
        print ('data:', request.POST)

        amount = int(request.POST['amount'])
        

        customer = stripe.Customer.create(
            name=request.POST['nickname'],
            email=request.POST['email'],
            phone = request.POST['phone'],
            metadata = {"address":request.POST['address']},
            source=request.POST['stripeToken']
        )

        stripe.Charge.create(
            customer = customer,
            amount = (amount * 100),
            currency = 'inr',
            description = 'Payment for Subscription'


        )


        return redirect(reverse('success', args=[amount]))

    return render (request, 'payment.html')

def success(request, args):
    amount = args
    return render(request, 'success.html', {'amount':amount})
