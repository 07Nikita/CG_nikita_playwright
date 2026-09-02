import bug_analysis_agent
from requirement_agent import requirement_agent
from test_case_agent import test_case_agent
from bug_analysis_agent import bug_analysis_agent
from bug_failure_report_agent import bug_failure_report_agent
 
 
requirement = """
An online food ordering application allows customers to log in,
search for restaurants, add food items to their cart, remove
items from the cart, apply coupons, select a delivery address,
make payments, and place orders.
 
The application supports UPI, credit/debit cards, and Cash on Delivery.
 
The coupon SAVE20 provides a 20% discount on orders above Rs. 500,
with a maximum discount of Rs. 150.
 
If payment fails, the order should not be created.
 
If payment succeeds, the customer should receive an order
confirmation containing an order ID.
"""
 
 
# ==========================================
# AGENT 1 - REQUIREMENT ANALYSIS
# ==========================================
 
print("\n" + "=" * 70)
print("AGENT 1 - REQUIREMENT ANALYSIS")
print("=" * 70)    
 
analysis_response = requirement_agent.invoke({
    "requirement": requirement
})
 
analysis = analysis_response.content
 
print(analysis)
 
 
# ==========================================
# AGENT 2 - TEST CASE GENERATION
# ==========================================
 
print("\n" + "=" * 70)
print("AGENT 2 - TEST CASE GENERATION")
print("=" * 70)
 
test_case_response = test_case_agent.invoke({
    "requirement": requirement,
    "analysis": analysis
})
 
test_cases = test_case_response.content
 
print(test_cases)
 
print("\nFULL RESPONSE:")
print(test_case_response)
 
print("\nCONTENT:")
print(test_case_response.content)
 
 
# ==========================================
# AGENT 3 - BUG ANALYSIS
# ==========================================
 
print("\n" + "=" * 70)
print("AGENT 3 - BUG ANALYSIS")
print("=" * 70)
 
defect = """
A customer adds food worth Rs. 600 to the cart and applies
the SAVE20 coupon.
 
The application gives a discount of Rs. 200 instead of
the expected discount of Rs. 120.
"""
 
bug_response = bug_analysis_agent.invoke({
    "requirement": requirement,
    "defect": defect
})
 
bug_analysis = bug_response.content
 
print(bug_analysis)
 
print("\nFULL RESPONSE:")
print(bug_response)
 
print("\nCONTENT:")
print(bug_response.content)
 
 
# ==========================================
# AGENT 4 - BUG FAILURE REPORT
# ==========================================
 
print("\n" + "=" * 70)
print("AGENT 4 - BUG FAILURE REPORT")
print("=" * 70)
 
failure_response = bug_failure_report_agent.invoke({
    "requirement": requirement,
    "defect": defect,
    "bug_analysis": bug_analysis
})
 
failure_report = failure_response.content
 
print(failure_report)
 
print("\nFULL RESPONSE:")
print(failure_response)
 
print("\nCONTENT:")
print(failure_response.content)
 