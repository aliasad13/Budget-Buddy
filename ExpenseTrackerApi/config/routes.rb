Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :expenses do
        collection do
          get 'recent_expenses', to: 'expenses#recent_expenses'
        end
      end
    end
  end


  mount ActionCable.server => '/cable'

end
