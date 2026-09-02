
from llm_config import chat_model
 
requirement = """
Food delivery application where users can log in, search
restaurants, add and remove food from the cart, apply SAVE20,
choose an address, pay using UPI/cards/COD and place orders.
 
SAVE20 gives 20% off when the order is above Rs. 500.
The maximum discount is Rs. 150.
 
A failed payment must not create an order.
A successful payment should produce an order ID.
"""
 
prompt = f"""
Create a set of software test cases for this food delivery
application.
 
Include:
1. Successful scenarios
2. Failure scenarios
3. Cart add/remove scenarios
4. Coupon scenarios
5. Amounts around the Rs. 500 threshold
6. Payment scenarios
7. Order creation scenarios
 
For each test case give:
- Test case ID
- Scenario
- Preconditions
- Steps
- Test data
- Expected result
- Priority
 
Application requirement:
{requirement}
"""
 
response = chat_model.invoke(prompt)
 
print("TEST CASES:")
print(response.content)
 