module.exports = 
{ url: 'https://www.flickr.com/search/?q=kitten&l=deriv'
, cols: 
   [ { desc: 'title'
     , sel: "//img[contains(@class,'pc_img')]"
     , attr: 'alt' 
     , fn: function(str) { return str.toUpperCase; }
     }
   ] 
}
