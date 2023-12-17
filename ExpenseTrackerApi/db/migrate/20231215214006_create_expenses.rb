class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.string :description
      t.decimal :amount
      t.date :date

      t.timestamps
    end
  end
end
