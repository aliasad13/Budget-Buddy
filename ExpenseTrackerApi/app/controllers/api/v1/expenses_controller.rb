# app/controllers/api/v1/expenses_controller.rb
module Api
  module V1
    class ExpensesController < ApplicationController
      before_action :set_expense, only: [:show, :update, :destroy]

      def index
        @expenses = Expense.order(date: :asc)
        render json: @expenses
      end

      def recent_expenses
        @recent_expenses = Expense.last_seven_days
        render json: recent_expenses
      end

      def show
        render json: @expense
      end

      def create
        @expense = Expense.new(expense_params)

        if @expense.save
          render json: @expense, status: :created
          ActionCable.server.broadcast('notifications', { message: 'New Expense created!' })
        else
          render json: @expense.errors, status: :unprocessable_entity
        end
      end


      def update
        if @expense.update(expense_params)
          render json: @expense
          ActionCable.server.broadcast('notifications', { message: 'Expense Updated!' })
        else
          render json: @expense.errors, status: :unprocessable_entity
        end
      end

      def destroy
        if @expense.destroy
          ActionCable.server.broadcast('notifications', { message: 'Expense destroyed!' })
        end
        head :no_content
      end

      private

      def set_expense
        @expense = Expense.find(params[:id])
      end

      def expense_params
        params.require(:expense).permit(:description, :amount, :date)
      end
    end
  end
end
