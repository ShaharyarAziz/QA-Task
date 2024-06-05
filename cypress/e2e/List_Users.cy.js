import { url_link } from "./api_url.cy";

describe("TASK", () => {
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
