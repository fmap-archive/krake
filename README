Krake.js
========

Krake is a library for declarative web scraping, written in Javascript. It
abstracts away the boilerplate of web scrapers, so you don't need to describe
anything but features unique to your project.

Using existing libraries to write a web scraper usually involves writing code
to request, parse, select, (perhaps) modify, and serialise HTML content. You
might request a single URL; or fetch a collection of URLs populated from either
the results of another task, or known patterns in addresses. You're likely
selecting content with XPath expressions, scoped to single item-representing
DOM elements. You're probably serialising to a list of objects with fixed
structure, reflecting how you expect the data was originally represented.

There's a lot of boilerplate in web scraping. Most of what varies from project
to project is the structure of target pages, and the data underlying them. The
ideal motivating this project is a function from a minimal representation of
a scraper in data, to the data it intended to specify. Right now we believe
that representation looks close to:

```javascript
{ url: 
    { pattern: "https://www.flickr.com/search/?q=@keywords@&l=@licenses@"
    , keywords: ["kitten", "cat", "meow"]
    , licenses: ["comm", "deriv"]
    }
, cols:
    [ { desc: "title"
      , sel: "//img[@class='pc_img ']" // XPath or CSS.
      , attr: "alt"
      }
    , { desc: "image"
      , sel: "//img[@class='pc_img ']"
      , attr: "src"
      , fn: function(str) {return str.replace(/(\.[a-z]+)$/,/_b$1/);} 
      } 
    , { desc: "owner"
      , sel: "//a[@data-track='owner']"
      , attr: 'title'
      }
    , { desc: "page"
      , sel: "//a[contains(@class,'photo-click')]"
      , attr: "href"
      , cols: // A nested task, with supra referenced page as pattern.
          [ { desc: "description"
            , sel: "//div[contains(@class,'photo-desc')]"
            // When no 'attr' is specified, we call the text() of the specified element content.
            }
          ]
      }
    ]
}
```

<!-- vim:set ft=markdown: -->
