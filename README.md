# amiconsult-api

The API uses a local mongodb database, please see config.env.
All IDs are mongodb IDs. (document._id)

The additional endpoint POST rest/users/
accepts an object with „name“ and „token“ to create a user.
Since the instructions recommend to keep it simple, there is no further validation for creating a user.
The token must be provided for authorized actions (create booking, delete booking) as „Bearer Token“ to simulate an active session.

running
node seeds.js --delete
will delete all documents from the database

node seeds.js --import
will create 3 rooms with 10 seats each as well as a user „Malte“ with token „wakndi492jn290n8398“

The app uses mongoSanitize and xss for basic protection.
