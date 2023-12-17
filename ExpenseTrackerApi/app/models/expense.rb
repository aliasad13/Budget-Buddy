class Expense < ApplicationRecord

  scope :last_seven_days, -> { where('date <= ?', 7.days.ago) }

end
