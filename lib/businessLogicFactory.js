const DefaultLogic = require("./businessLogic/defaultLogic");

// List of all possible company's class functions for their business logic
const companies = { DefaultLogic }

module.exports = {
    createFor(businessType) {
        const BusinessLogic = companies[businessType];

        return new BusinessLogic();
    }
}