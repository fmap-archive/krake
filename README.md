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
  { url: 'https://www.flickr.com/search/?q=kitten&l=deriv'
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
> new Krake({}).scrape(task).on('retrieved', console.log)
                            .on('complete', function(){this.removeAllListeners()});
{ title: 'The Magic Kitten',
  image: 'https://farm3.staticflickr.com/2346/2250708458_2ea01e630d_b.jpg',
  owner: 'craiglea123',
  page: { description: '\n\t\t<p>A story about a magical kitten whose uncle stole the throne. When it\nwas really a lion cub and it was a king.</p>\n\t\t\t\t' } 
}
{ title: 'Kitten of Lusy',
  image: 'https://farm6.staticflickr.com/5171/5594694155_8cda95fcd4_b.jpg',
  owner: 'Viola & Cats =^..^=',
  page: { description: '\n\t\t<p>Last of 3 kitten of my Lusy, has two days.<br />What adorable !!!!!!!!</p><p><a href="http://flickriver.com/photos/tags/gattini/interesting/" rel="nofollow">flickriver.com/photos/tags/gattini/interesting/</a></p>\n\t\t\t\t' 
} 
}
{ title: '"Kitten Geyser"',
  image: 'https://farm7.staticflickr.com/6226/6248895206_b4a9be027e_b.jpg',
  owner: 'Desa Windsinger',
  page: { description: '\n\t\t<p>"Kitten Geyser", Geyser Hill Group, Upper Geyser Basin. \n(DSCN2922rev)</p>\n\t\t\t\t' } 
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
