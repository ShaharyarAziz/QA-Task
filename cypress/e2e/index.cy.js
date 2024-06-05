import { url_link } from "./api_url.cy";

describe("TASK", () => {
  it("List Users", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      cy.log(response.body.data[0].email);
      expect(response.body.data[0].first_name).to.equal("Michael");
      expect(response.body.data[0].email).to.equal("michael.lawson@reqres.in");
      expect(response.body.data[0]).to.have.property("email");

    });
  });
  // Test to check response structure
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
    });
  });
});
