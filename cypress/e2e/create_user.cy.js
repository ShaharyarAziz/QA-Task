describe("Positive Test Cases Create User", () => {
  it("gives status code 200 on Successfull post request", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
      },
    }).then((response) => {
      cy.log(response.body.name);
      expect(response.status).to.equal(201);
    });
  });
  it("returns correct response structure", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
      },
    }).then((response) => {
      expect(response.body).to.have.property("name", "test2");
      expect(response.body).to.have.property("job", "testing2");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("createdAt");
    });
  });
  it("returns the correct data in the response", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
      },
    }).then((response) => {
      expect(response.body.name).to.equal("test2");
      expect(response.body.job).to.equal("testing2");
    });
  });
  it("returns a response within an acceptable time", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
      },
    }).then((response) => {
      expect(response.duration).to.be.lessThan(1000); // Ensure response time is less than 1 second
    });
  });
  it("should have a non-empty id field", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
      },
    }).then((response) => {
      expect(response.body.id).to.not.be.empty;
    });
  });

  it("should have a createdAt field with a valid timestamp", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
      },
    }).then((response) => {
      const createdAt = new Date(response.body.createdAt);
      expect(createdAt.toString()).to.not.equal("Invalid Date");
    });
  });
  it("should handle multiple data types", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "test2",
        job: "testing2",
        age: 30,
        isEmployed: true,
      },
    }).then((response) => {
      expect(response.body.name).to.equal("test2");
      expect(response.body.job).to.equal("testing2");
      expect(response.body).to.have.property("age");
      expect(response.body.age).to.equal(30);
      expect(response.body).to.have.property("isEmployed");
      expect(response.body.isEmployed).to.be.true;
    });
  });
  it("should accept and return stringified JSON data", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: JSON.stringify({
        name: "test2",
        job: "testing2",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.body.name).to.equal("test2");
      expect(response.body.job).to.equal("testing2");
    });
  });
});

describe("Negative Test Cases for Create User", () => {
    it("should return status code 400 for missing body", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400); // Status code for bad request
      });
    });
  
    it("should return status code 400 for missing name", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          job: "testing2",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400); // Status code for bad request
      });
    });
  
    it("should return status code 400 for missing job", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: "test2",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400); // Status code for bad request
      });
    });
  
    it("should return status code 415 for unsupported content type", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: "test2",
          job: "testing2",
        },
        headers: {
          "Content-Type": "text/plain",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(415); // Status code for unsupported media type
      });
    });
  
    it("should return status code 400 for invalid JSON", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: "{name: test2, job: testing2}", // Invalid JSON format
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400); // Status code for bad request
      });
    });
  
    it("should return status code 404 for incorrect URL", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/incorrect_url",
        body: {
          name: "test2",
          job: "testing2",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404); // Status code for not found
      });
    });
  
    it("should return status code 401 for unauthorized request", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: "test2",
          job: "testing2",
        },
        headers: {
          Authorization: "Bearer invalid_token",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401); // Status code for unauthorized
      });
    });
  
    it("should return status code 403 for forbidden request", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: "test2",
          job: "testing2",
        },
        headers: {
          Authorization: "Bearer valid_token_with_no_permission",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403); // Status code for forbidden
      });
    });
  
    it("should return status code 500 for server error", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: "test2",
          job: "testing2",
        },
        headers: {
          "Simulate-Server-Error": "true",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(500); // Status code for internal server error
      });
    });
  
    it("should return status code 408 for request timeout", () => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: "test2",
          job: "testing2",
        },
        timeout: 1, // Setting timeout to 1ms to simulate timeout
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(408); // Status code for request timeout
      });
    });
  });
  