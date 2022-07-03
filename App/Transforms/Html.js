import cheerio from 'react-native-cheerio';

export default (object) => {
  const $ = cheerio.load(object);
  return $('.list-inline .list-inline-item a').map((i, el) => (
    $(el).text().replace(/^\s+|\s+$/g, '')
  )).get();
};

export const wordOf = (object) => {
  const $ = cheerio.load(object);
  const root = $('div.card-body');
  const foot = $('div.card-footer');
  return {
    text: $('p', root).html(),
    dict: $('.defDetails li', root).first().text(),
    image: $('img.img-fluid', root).attr('src'),
    word: $('img.img-fluid', root).attr('title'),
    choice: foot.html(),
  };
};

