exports.default = ()=> {
    const siteConfig = {
      env:'dev',
      'logo':'/assets/static/logo.jpg',
      'title':'My website',
      'description':'This is a really awesome website where we can render on the server. Supa cool.',
      'facebookApp':'XXXXXXXXXXXXXXXX',
      'twitter':'@cereallarceny',
      siteUrl:{
        'prod':'https://www.example.com',
        'dev':'http://localhost:3000'
      },
      fetchFrom:{
        'prod' : 'https://myawesomeapi.swagger.io/v2/{PATH}',
        'dev': 'http://localhost:8000/data/page/{PATH}'
      }
    };
    return siteConfig;
  };