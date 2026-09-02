from llm_config import chat_model
 
requirement = """
I am testing a food delivery application.
 
A user can sign in, find a restaurant, choose food,
manage the cart, use a discount coupon, select a delivery
location, choose a payment method and submit an order.
 
The application accepts UPI, debit/credit cards and
Cash on Delivery.
 
The coupon SAVE20 provides a 20 percent discount when
the qualifying order amount is above Rs. 500. The
discount cannot exceed Rs. 150.
 
An unsuccessful payment must not result in an order.
After a successful payment, the application should show
an order confirmation and generate an order ID.
"""
 
prompt = f"""
Review the following application requirement as a software
testing professional.
 
Give me:
- the main features that need testing
- requirements that are unclear
- important input validations
- unusual situations that could cause failures
 
Requirement:
{requirement}
"""
 
response = chat_model.invoke(prompt)
 
print("REQUIREMENT ANALYSIS:")
print(response.content)
 