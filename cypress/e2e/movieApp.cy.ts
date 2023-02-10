beforeEach(() => {
  cy.visit("/"); //-> cypress.config.ts baseUrl
});

describe("movieApp", () => {
  it("should get movie list", () => {
    cy.get("input").type("Lego").should("have.value", "Lego");
    cy.get("button").click();
    cy.get("h3").should("contain", "Lego");
    cy.get("div#movie-container>div").should("have.length", 10);
    cy.get("img").should("have.length", 10);
  });

  it("should get correct movie", () => {
    cy.get("input")
      .type("A Cautionary Tale: The Making of 'Alpha Dog'")
      .should("have.value", "A Cautionary Tale: The Making of 'Alpha Dog'");
    cy.get("button").click();
    cy.get("h3").should(
      "contain",
      "A Cautionary Tale: The Making of 'Alpha Dog'"
    );
    cy.get("div#movie-container>div").should("have.length", 1);
  });

  it("should get correct movie with mix letters", () => {
    cy.get("input")
      .type("A cAuTioNaRY TAle: ThE MaKiNg of 'AlPhA DoG'")
      .should("have.value", "A cAuTioNaRY TAle: ThE MaKiNg of 'AlPhA DoG'");
    cy.get("button").click();
    cy.get("h3").should(
      "contain",
      "A Cautionary Tale: The Making of 'Alpha Dog'"
    );
    cy.get("div#movie-container>div").should("have.length", 1);
  });
});

describe("show noMessage", () => {
  it("should display noMessage", () => {
    const testInputField: string[] = [
      "a",
      "!",
      "?",
      "+",
      "@",
      "#",
      " ",
      "chewbacca is hairy",
    ];

    for (let i = 0; i < 10; i++) {
      testInputField.push(String(i));
    }
    testInputField.forEach((test: string) => {
      cy.visit("/"); //have to reset page before each loop
      cy.get("input").type(test);
      cy.get("button").click();
      cy.get("P").should("contain", "Inga sökresultat att visa");
    });
  });

  it("should display noMessage when not writing anything in input field", () => {
    cy.get("button").click();
    cy.get("P").should("contain", "Inga sökresultat att visa");
  });
});

describe("mock data", () => {
  it("should get mock data", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
      fixture: "omdbResponse",
    }).as("omdbCall");
    cy.get("input").type("testMovies");
    cy.get("button").click();
  });

  it("should get correct mock data", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
      fixture: "omdbResponse",
    }).as("omdbCall");
    cy.get("input").type("testMovies").should("have.value", "testMovies");
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
});
