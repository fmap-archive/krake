module.exports = 
{ url: 'https://www.flickr.com/search/?q=kitten&l=deriv'
, cols: 
   [ { desc: 'page'
     , sel: "//a[contains(@class,'photo-click')]"
     , attr: 'href'
     , cols:
         [ { desc: "description"
           , sel: "//div[contains(@class,'photo-desc')]"
           }
         ]
     } 
   ] 
}
