module.exports = 
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
           // When no 'attr' is specified, we use the innerHTML of the specified element;
           }
         ]
     }
   ] 
}
