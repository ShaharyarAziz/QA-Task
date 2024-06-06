import { url_link } from "./api_url.cy";

describe("Positive Test Cases for List Users", () => {
  it("should return status code 200", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
  it("should return response within acceptable time", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      expect(response.duration).to.be.lessThan(1000); // Ensure response time is less than 1 second
    });
  });
  it("should have correct user data", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      const user = response.body.data.find(
        (user) => user.first_name === "Michael"
      );
      expect(user).to.exist;
      expect(user.first_name).to.equal("Michael");
      expect(user.email).to.equal("michael.lawson@reqres.in");
    });
  });
  //Property Check
  it("should have the correct response structure", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      cy.log(response);
      expect(response.body).to.have.property("page");
      expect(response.body).to.have.property("per_page");
      expect(response.body).to.have.property("total");
      expect(response.body).to.have.property("total_pages");
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
      expect(response.body).to.have.property("support");
      expect(response.body.support).to.have.property("url");
      expect(response.body.support).to.have.property("text");
    });
  });
  //Pagination Check
  it("should handle pagination correctly", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      expect(response.body.page).to.equal(2);
      expect(response.body.total_pages).to.be.greaterThan(1);
    });
  });
});
describe("Negative Test Cases for List Users", () => {
  // Invalid page number
  it("should return status code 404 for an invalid page number", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=9999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  // Missing page parameter
  it("should return a response with missing page parameter", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  // Invalid URL
  it("should return status code 404 for an invalid URL", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/invalidEndpoint",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  // Invalid method
  it("should return status code 405 for an invalid method", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users?page=2",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(405);
    });
  });

  // Incorrect data type for page parameter
  it("should return status code 400 for incorrect data type in page parameter", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=invalid",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  // Unauthorized access
  it("should return status code 401 for unauthorized access", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
      auth: {
        bearer: "invalid_token",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
    });
  });

  // Response structure check with incorrect structure
  it("should return incorrect response structure", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body).not.to.have.property("nonexistentProperty");
    });
  });

  // Check for missing user data
  it("should return an empty array for non-existent page", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=9999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.data).to.be.an("array").that.is.empty;
    });
  });

  // Pagination check with invalid total pages
  it("should return incorrect pagination details", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.total_pages).to.not.equal(-1);
    });
  });
});
