beforeEach(() => {
  cy.visit("/"); //-> cypress.config.ts baseUrl
});

it("should get mock data", () => {
  cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
    fixture: "omdbResponse",
  }).as("omdbCall");
  cy.get("input").type("testMovies");
  cy.get("button").click();
  cy.wait("@omdbCall")
    .its("response.body.Search")
    .should("eql", [
      {
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg",
        Title: "Lego the Movie",
        Type: "horror",
        Year: 1254,
        imdbID: "qe5136",
      },
      {
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZjViNzNkNjAtMGZmZi00MDM2LTk1OGUtYjVlNzhjNjIxNDgwXkEyXkFqcGdeQXVyMTAyNzc0MDkz._V1_SX300.jpg",
        Title: "Dog on moon",
        Type: "drama",
        Year: 2099,
        imdbID: "2f651",
      },
      {
        Poster:
          "https://m.media-amazon.com/images/M/MV5BYmExOTRkNjMtZTk5OS00ZDk3LTk0ZDktMzE2ZWQ0ZjBmNDY3XkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SX300.jpg",
        Title: "Moonstar",
        Type: "adventure",
        Year: 1999,
        imdbID: "pq7775",
      },
    ]);
});

// describe("should test movieApp", () => {
//   // it("should be able to write in input", () => {
//   //   cy.get("input").type("Lego").should("have.value", "Lego");
//   // });
//   it("should be able to click search btn", () => {
//     cy.get("input").type("Lego").should("have.value", "Lego");

//     cy.get("button").click();
//   });
// });
