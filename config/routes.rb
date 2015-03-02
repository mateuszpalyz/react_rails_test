Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    resources :books
  end
end
