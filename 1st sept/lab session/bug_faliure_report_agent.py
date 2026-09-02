from llm_config import chat_model
 
defect = """
A customer has an order worth Rs. 600 and applies the SAVE20
coupon. The application gives a discount of Rs. 200, although
the correct 20 percent discount should be Rs. 120.
"""
 
prompt = f"""
Prepare a professional software defect report for the
following failure.
 
Include:
- Defect title
- Defect description
- Preconditions
- Steps to reproduce
- Test data
- Expected result
- Actual result
- Severity
- Priority
- Business impact
- Suggested fix
 
Failure:
{defect}
"""
 
response = chat_model.invoke(prompt)
 
print("DEFECT REPORT:")
print(response.content)
 