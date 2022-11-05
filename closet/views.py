from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView

from .models import Garment


def index(request):
    return HttpResponse("Hello, world. You're at the index.")


class WardrobeView(generic.ListView):
    model = Garment
    template_name = 'closet/wardrobe.html'

    def get_queryset(self):
        # only show the garments in the current user's wardrobe
        return Garment.objects.filter(owner=self.request.user)


class GarmentView(generic.DetailView):
    model = Garment
    template_name = 'closet/garment.html'


class GarmentCreateView(CreateView):
    """Create a new garment"""
    model = Garment
    fields = ['garment_name']
    success_url = '/closet/wardrobe/'

    def form_valid(self, form):
        garment = form.save(commit=False)
        garment.owner = self.request.user
        garment.save()

        return HttpResponseRedirect(self.success_url)


class GarmentUpdateView(UpdateView):
    model = Garment
    fields = ['garment_name', 'purchase_date', 'purchase_price']
    template_name_suffix = '_update_form'
    success_url = '/closet/wardrobe/'

class GarmentDeleteView(DeleteView):
    """docstring for GarmentDeleteView"""
    model = Garment
    success_url = '/closet/wardrobe/'