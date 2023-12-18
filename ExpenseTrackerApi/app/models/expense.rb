class Expense < ApplicationRecord

  scope :last_seven_days, -> { where('date <= ?', 7.days.ago) }

  validates :date, presence: true
  validates :amount, presence: true
  validates :description, presence: true

end
