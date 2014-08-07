Codesec::Application.routes.draw do
  devise_for :users

  resources :settings


  get "diagnostics/home"

  resources :zones


  get "dashboard/testing"

  get "dashboard/index"

  resources :zone_statuses

 match '/recent', to: 'zone_statuses#recent', via: :get
 match '/sparklines', to: 'dashboard#sparklines', via: :get
 match '/dashboard', to: 'dashboard#index', via: :get
 match '/diagnostics', to: 'diagnostics#home', via: :get
root :to => 'dashboard#index'

end
