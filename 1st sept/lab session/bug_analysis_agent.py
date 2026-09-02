from llm_config import chat_model
 
defect = """
During checkout, a customer has food items worth Rs. 600.
The customer enters the SAVE20 coupon. The application
reduces the bill by Rs. 200 instead of Rs. 120.
"""
 
prompt = f"""
Investigate this software defect.
 
Determine:
- what the expected behaviour should be
- what the application actually did
- why this is a defect
- the business impact
- severity
- priority
- a possible technical cause
 
Defect:
{defect}
"""
 
response = chat_model.invoke(prompt)
 
print("BUG ANALYSIS:")
print(response.content)
 