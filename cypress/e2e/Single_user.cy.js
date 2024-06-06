describe("Positive Test Cases for Single User", () => {
  it("should return status code 200", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      cy.log(response);
      expect(response.status).to.equal(200);
    });
  });
  it("should return response within acceptable time", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      expect(response.duration).to.be.lessThan(1000);
    });
  });
  it("should have correct user data", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("id", 2);
      expect(response.body.data).to.have.property(
        "email",
        "janet.weaver@reqres.in"
      );
      expect(response.body.data).to.have.property("first_name", "Janet");
      expect(response.body.data).to.have.property("last_name", "Weaver");
      expect(response.body.data)
        .to.have.property("avatar")
        .and.to.match(/^https:\/\/reqres\.in\/img\/faces\/2-image\.jpg$/);

      // Check support section
      expect(response.body).to.have.property("support");
      expect(response.body.support).to.have.property(
        "url",
        "https://reqres.in/#support-heading"
      );
      expect(response.body.support)
        .to.have.property("text")
        .and.to.be.a("string");
    });
  });
  it("should contain correct headers", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      expect(response.headers)
        .to.have.property("content-type")
        .and.to.include("application/json");
      expect(response.headers)
        .to.have.property("cache-control")
        .and.to.include("max-age");
    });
  });
  it("should return 404 for non-existing user", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23", // Assuming user with id 23 does not exist
      failOnStatusCode: false, // Prevents Cypress from failing the test on 404
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("should return response with expected structure", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      expect(response.body).to.have.keys("data", "support");
      expect(response.body.data).to.have.keys(
        "id",
        "email",
        "first_name",
        "last_name",
        "avatar"
      );
      expect(response.body.support).to.have.keys("url", "text");
    });
  });
  it("should have data properties as strings or numbers", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      const { data } = response.body;
      expect(data.id).to.be.a("number");
      expect(data.email).to.be.a("string");
      expect(data.first_name).to.be.a("string");
      expect(data.last_name).to.be.a("string");
      expect(data.avatar).to.be.a("string");
    });
  });
  it("should have a valid email format", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      const { email } = response.body.data;
      expect(email).to.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    });
  });
});
describe("Negative Test Cases for Single User", () => {
  // Test to check invalid user ID (non-numeric)
  it("should return 404 for non-numeric user ID", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/abc", // Invalid user ID
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.be.empty;
    });
  });

  // Test to check invalid user ID (negative number)
  it("should return 404 for negative user ID", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/-1", // Invalid user ID
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.be.empty;
    });
  });

  // Test to check user ID that doesn't exist
  it("should return 404 for non-existing user ID", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/9999", // Assuming user with ID 9999 doesn't exist
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.be.empty;
    });
  });

  // Test to check invalid HTTP method (POST instead of GET)
  it("should return 201 for invalid HTTP method", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users/2",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(201);
    //   expect(response.body).to.have.property("error");
    });
  });

  // Test to check invalid HTTP method (PUT instead of GET)
  it("should return 200 for invalid HTTP method", () => {
    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  // Test to check invalid endpoint
  it("should return 404 for invalid endpoint", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/user/2", // Typo in endpoint
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("error");
    });
  });

  // Test to check missing endpoint
  it("should return 404 for missing endpoint", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/", // Missing user ID
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("error");
    });
  });

  // Test to check invalid protocol (http instead of https)
  it("should return 404 for invalid protocol", () => {
    cy.request({
      method: "GET",
      url: "http://reqres.in/api/users/2", // Using http instead of https
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  // Test to check malformed URL
  it("should return 404 for malformed URL", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2?test=invalid", // Adding invalid query parameter
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("error");
    });
  });

  // Test to check response with unsupported media type
  it("should return 415 for unsupported media type", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/2",
      headers: {
        "Content-Type": "application/xml", // Unsupported media type
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(415);
      expect(response.body).to.have.property("error");
      cy.screenshot();
    });
  });
  
});
