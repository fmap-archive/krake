module.exports =
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
