require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module ExpenseTrackerApi
  class Application < Rails::Application
    config.load_defaults 7.0

    config.action_cable.mount_path = '/cable'

    config.api_only = true
  end
end
