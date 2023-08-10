# Solution Description
1. Create two models Order and Service.
2. Order Model has array of serviceId refering to services.
3. Added User action permission check middleware, Only Admin has Create/Update/ Delete Order permission
4. Added middleware to restrict order creation within 3 hours.
5. Added middleware on Create/Update to calculate totalfees of a order based on services added.

# Possible Improvement For Production
1. User role can be fetched from accessToken and should not be passed in body.
2. Orders can be created based on UserId.
3. The 3 hours check can be enforced based on userId.

# Project Setup
1. Clone the project
2. Run npm install
3. Add config.env file and add MONGODB_URL in it.
4. npm run dev
5. For running Unit test - npm run test

# Payload Exmaple for Create and update
{
    "user": {
        "role": "admin"
    },
    "services": ["64d48795aedb1fe2f2719d24"]
}