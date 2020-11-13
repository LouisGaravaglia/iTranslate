const images = {name:"Maluma", img_url:[{height:40, url:"http:1", width:200}, {height:40, url:"http:2", width:200}, {height:40, url:"http:3", width:200}]};

const testing = images.img_url.filter(item => item.url);

console.log(testing);