Krake.js
========

Krake is a library for declarative web scraping, written in Javascript. It
abstracts away the boilerplate of web scrapers, so you don't need to describe
anything but features unique to your project.

Using existing libraries to write a web scraper usually involves writing code
to request, parse, select, modify, and serialise HTML content. You might
request a single URL; or fetch a collection of URLs populated from either the
results of another task, or known patterns in addresses. You're likely
selecting content with XPath expressions, scoped to single item-representing
DOM elements. You're probably serialising to a list of objects with fixed
structure, reflecting how you expect the data was originally represented.

There's a lot of boilerplate in web scraping. Most of what varies from project
to project is the structure of target pages, and the data underlying them. The
ideal motivating this project is a function from a minimal representation of
a scraper in data, to the data it intended to specify. Right now we believe
that representation looks close to:

```javascript
> var task = 
  { url: 
    { pattern: "https://www.flickr.com/search/?q=@keywords@&l=@licenses@"
    , keywords: ["kitten", "cat", "meow"]
    , licenses: ["comm", "deriv"]
    }
  , cols: 
     [ { desc: 'title'
       , sel: "//img[contains(@id,'photo_img_')]"
       , attr: 'alt' 
       }
     , { desc: 'image'
       , sel: "//img[contains(@id,'photo_img_')]"
       , attr: 'data-defer-src'
       , fn: function(str) {return str.replace(/(\.[a-z]+)$/,'_b$1');} 
       }
     , { desc: 'owner'
       , sel: "//a[@data-track='owner']"
       , attr: 'title' 
       }
     , { desc: 'page'
       , sel: "//a[contains(@class,'photo-click')]"
       , attr: 'href'
       , cols: // A nested task, with supra referenced page as pattern.
           [ { desc: "description"
             , sel: "//div[contains(@class,'photo-desc')]"
             // When no 'attr' is specified, we use the innerHTML of the specified element
             }
           ]
       }
     ] 
  }
```

Given such a definition, we can set up an emitter to receive results as they're
retrieved:

```javascript
> var Krake = require('krake');
> new Krake({}).scrape(task).on('retrieved', console.log);
{ title: 'meow meow and the mouse',
  image: 'https://farm5.staticflickr.com/4072/4217411837_05b4ba416f_b.jpg',
  owner: 'megankhines',
  page: { description: '\n\t\t<p>Kittens</p>\n\t\t\t\t' } 
}
{ title: 'meow meow',
  image: 'https://farm1.staticflickr.com/26/50499021_cefc189a28_b.jpg',
  owner: 'megankhines',
  page: { description: '\n\t\t<p>Kittens</p>\n\t\t\t\t' } 
}
{ title: 'Meow',
  image: 'https://farm3.staticflickr.com/2543/3843401084_2495a1367d_b.jpg',
  owner: 'mindy_g',
  page: { description: '\n\t\t<p>Kittens</p>\n\t\t\t\t' } 
}
[..]
```

Krake.IO
--------

Defining programs in data (we don't mean syntax trees ;-) provides several
advantages. For one, it's a catalyst for re-use; when that data (`||` embedded
data) defines a web scraper, once a single great canonical implementation has
been written for a service, that work can be reused and extended with minimal
wrangling. It also facilitates the development of even higher-level
abstractions, having reduces the requirement from writing to low-level code, to
writing high-level definitions.

[Krake.IO](https://krake.io) have been building tools on top of this library.
They've developed a [graphical interface for constructing
definitions](https://chrome.google.com/webstore/detail/krakeio/ofncgcgajhgnbkbmkdhbgkoopfbemhfj),
and [rent clusters to perform larger tasks](https://krake.io). You should
investigate these! [fmap](https://github.com/fmap) works there, and they [hold
this code's copyright](https://github.com/fmap/krake/blob/master/LICENSE).

<!-- vim:set ft=markdown: -->.
