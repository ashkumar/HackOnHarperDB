# HarperDB Portlet built using Angular
This is a Liferay portlet build using Angular.
It demonstrates client side Angular integration with Liferay.
Portlet resource URL is passed from the server to the client.  The client can then use this URL to make server side calls.
The resulting server side calls are very simple and secure. Since Angular works with JSON objects, no server side marshalling or unmarshalling is necessay.
This project makes it very easy to create and modify forms. Only changes to Client side models are required. 
The forms can also be saved in an un submitted state. This is critical for very complex forms wherein all the data is not available at the same time.  HarperDB being a schema less database has been critical component in enabling this capability.

