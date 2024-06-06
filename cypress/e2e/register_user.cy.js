describe("Positive Test Cases for Register User", () => {
    it("should give status code 200", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        cy.log(response.body);
      });
    });
  
    it("should return a valid user ID", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.body).to.have.property("id");
        expect(response.body.id).to.be.a("number");
      });
    });
  
    it("should return a valid token", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.body).to.have.property("token");
        expect(response.body.token).to.be.a("string");
      });
    });
  
    it("should have correct email in the request", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.request.body.email).to.equal("eve.holt@reqres.in");
      });
    });
  
    it("should have correct password in the request", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.request.body.password).to.equal("pistol");
      });
    });
  
    it("should return response within acceptable time", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.duration).to.be.lessThan(1000); // Ensure response time is less than 1 second
      });
    });
  
    it("should have Content-Type header as application/json", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        expect(response.headers["content-type"]).to.include("application/json");
      });
    });
  
    it("should return status code 200 when using different valid email", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "another.email@reqres.in",
          password: "anotherpassword",
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
  describe("Negative Test Cases for Register User", () => {
    it("should return status code 400 for missing email", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          password: "pistol",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for missing password", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for missing both email and password", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for invalid email format", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "notanemail",
          password: "pistol",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for empty email", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "",
          password: "pistol",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for empty password", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for email with spaces", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "  ",
          password: "pistol",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for password with spaces", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "  ",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for SQL injection attempt", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "' OR 1=1; --",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for XSS attempt", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "<script>alert('XSS');</script>",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for extremely long email", () => {
      const longEmail = "a".repeat(256) + "@example.com";
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: longEmail,
          password: "pistol",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  
    it("should return status code 400 for extremely long password", () => {
      const longPassword = "a".repeat(256);
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: longPassword,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");
      });
    });
  });
  