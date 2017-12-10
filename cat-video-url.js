const urls = [
  'https://scontent.cdninstagram.com/t50.2886-16/16335418_398293333841559_4167017334034137088_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16335586_154715841695104_1246887159885987840_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16385689_1931030737129214_1571056752923770880_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16379238_151553292013764_3282604209677008896_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16404945_284985611915774_88914808098783232_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16385426_382513982106819_5222024231516110848_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16378886_374700289554509_3011694113780137984_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16328083_364353793938155_251732435560038400_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16335727_1792497591074384_2194982331276591104_n.mp4',
  'https://scontent.cdninstagram.com/t50.2886-16/16233075_692689510905166_7549878935236902912_n.mp4',
];

module.exports = {
  all: function() {
    return urls;
  },
  random: function() {
    return urls[Math.floor(Math.random() * urls.length)];
  }
};