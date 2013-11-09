module.exports = 
{ url: 'https://www.flickr.com/search/?q=kitten&l=deriv'
, cols: 
   [ { desc: 'title'
     , sel: "//img[contains(@class,'pc_img')]"
     , attr: 'alt' 
     }
   , { desc: 'image'
     , sel: "//img[contains(@class,'pc_img')]"
     , attr: 'src'
     }
   , { desc: 'owner'
     , sel: "//a[@data-track='owner']"
     , attr: 'title' 
     }
   , { desc: 'page'
     , sel: "//a[contains(@class,'photo-click')]"
     , attr: 'href'
     } 
   ] 
}
