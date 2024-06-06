describe("Positive Test Cases Login", () => {
  it("should give status code 200 on successful login", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("should return a valid token on successful login", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.body).to.have.property("token");
      expect(response.body.token).to.be.a("string");
    });
  });

  it("should return response within acceptable time", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.duration).to.be.lessThan(1000); // Ensure response time is less than 1 second
    });
  });

  it("should have correct content-type header", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.headers).to.have.property("content-type");
      expect(response.headers["content-type"]).to.include("application/json");
    });
  });

  it("should return status code 400 for missing password", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.equal("Missing password");
    });
  });

  it("should return status code 400 for missing email", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        password: "cityslicka",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.equal("Missing email or username");
    });
  });

  it("should return status code 400 for invalid email format", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "notanemail",
        password: "cityslicka",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.equal("user not found");
    });
  });
});
