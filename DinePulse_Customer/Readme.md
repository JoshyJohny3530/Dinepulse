# DINEPULSE :: CUSTOMER WEBSITE
## Created with React
------------------------------------------------------------------------------------------------------

For the 3rd Sprint, we implemented Customer Website process, which includes these screens and its functionalities : -

1. Home Page

	- Log In functionality
	
		Test Username : testuserr@gmail.com 
		Test Password : testuser@123
	
		- The user inputs email and password.
		- The system validates if all mandatory fields are filled.
		- If credentials are correct, then the user is redirected to the menu screen.
		- If credentials are incorrect, an error message will pop up in the Login Screen.
				
	- Forgot Password functionality:(Need to implement)
		
		- The user shall enter their email, and if it exists, a password reset link is sent.
		- In case there is no account linked to the provided email, an error message will appear.

	- Registration functionality :
		
		- The user fills in his information to register.
		- The system validates that all fields are correctly filled and meet the set criteria.
		- In case of successful registration, the user shall be redirected to the login page.
		- In case of registration with an already used email or username, a usage error message will appear.
		- The user has to agree with the terms and conditions for the completion of registration. (Need to implement)

	- Reservation functionality :
		
		- The user selects a date and time with other details as per the requirement.
		- The system checks if all the required fields are properly filled up.
		- In case of successful booking, a confirmation message is shown.
		- At the same time, if any reservation already exists, then that slot will disable and an error message will appear. (Need to implement)

2. Logout (Need to implement)

   		- The user clicks the logout button.
   		- The user asks for confirmation of the logout action. Need to implement
		- The user gets logged out and is redirected to the home page.
   		- Logout gets cancelled and stays on the same page.

3. Gallery Page

   		- The user navigates to the gallery page.
   		- The page displays a set of images about the restaurant.

4. About Us Page

   		- The user navigates to the about us page.
		- The page contains information about the different branches.
		- A small description about the business is also mentioned on the page.
		- Listed on the page is information about the Team Members.

5. Menu

		- The user navigates to the Menu Page.
		- System fetches categories from the API call.
		- It displays the menu items on the basis of the Category Selected.
		- The user shall click the "Add to Cart" button to add dishes to their cart.

6. Cart Screen

		-  The user navigates to the Cart Screen.
		- In case the cart is empty, a message is flashed.
		- The user clicks a button to increase the quantity of an item.
		- The user clicks a button to decrease the quantity of an item.
		- The user clicks a button to remove an item from the cart.
		- The system updates the price as the quantity changes.
		- The user clicks the button to proceed to the checkout page.

7. Check out

		- The user navigates to the checkout page.
		- The system checks that all required fields are filled correctly.
		- The user clicks a button to display cardholder information. (Need to implement)
		- The user selects between debit or credit card. (Need to implement)
		- The user completes the payment or chooses to continue shopping.
		- On success: success message is displayed
		- On failure: error message is displayed

8. Order Success

		- Success Message Message confirming order was successful.
		- Track Order Button allows the user to track the order status. (Need to implement)
		- Continue Shopping button enables that user can choose to return to the shopping menu. (Need to implement)
		- Print Receipt icon allows the user to print the order receipt for the customer.
