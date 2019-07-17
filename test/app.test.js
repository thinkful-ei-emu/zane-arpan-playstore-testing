const app = require("../app");
const expect = require("chai").expect;
const request = require("supertest");

describe("Show All Games", () => {
  it("Should return all games", () => {
    return request(app)
      .get("/apps")
      .query({})
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0]).to.include.all.keys(keyList);
      });
  });
});

describe("Test Genre", () => {
  it("Should throw error if Genre is not valid", () => {
    return request(app)
      .get("/apps")
      .query({ genres: "animation" })
      .expect(404, '"Please enter a valid genre or sort method."');
  });

  it("Should filter by Genre if genre is provided", () => {
    return request(app)
      .get("/apps")
      .query({ genres: "puzzle" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0]).to.include.all.keys(keyList);
        res.body.forEach(response => {
            expect(response.Genres).to.eql("Puzzle")
        })
      });
  });
});

const keyList = ("App",
"Category",
"Rating",
"Reviews",
"Size",
"Installs",
"Type",
"Price",
"Content Rating",
"Genres",
"Last Updated",
"Current Ver",
"Android Ver");
const genresList = ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"];
