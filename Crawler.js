var fs = require('fs')
var request = require('superagent');
var headers = {
    'Content-Type': 'application/json',
    'Host': 'app.netease.im',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'http://app.netease.im/index',
    'Cookie': 'Hm_lvt_b265bfbb2970bfbf3d9280e2d340acdc=1488274812,1488275127; Hm_lpvt_b265bfbb2970bfbf3d9280e2d340acdc=1488348461; _ga=GA1.2.836618781.1488275129; P_CLOUD_USER=laitiandi@shouhuichina.cn; NTESmanagementSI=8B59C96F8E8A3BFC9460A14B26045893.classa-nim20.server.163.org-8010; __gsid__=DF4D5FEF61844D8C964E844C962E5910; urs_t=fjDgCUo7o9deXW7djDOhO1lg; urs_u=q30E-hpZwwCaDNym7t8hDbzGLSaKeT2o2KBrzfc9k2UhS06oChP-TRWmwYZ7U8QbExNZ5X4tgE3/lrF3EohL8fdBpO0MRchEOmOl3CGwIrzVqaWcl9W0d7ibL4ErybkJC05tEtA9ibn8PemqYjsAx1SxM-miLKWlstGRwXc-ViIhJKPm4p8FZtkwCsN-JV4He42GKSMoQGs57t9Ooo7feY5xZkCueEMOye-rrUXiKRhOe7MFIlsVinW0nlgXAuMrf-sX4JCBYpwPshLuL8fwFQt3FYVbP7WzTSRZi3xqIh-SUgAO-Zsuc4QKKv/NpgrKsqsqfCSX2pIUbF5KJ423Eg==',
    'DNT': 1,
    'Connection': 'keep-alive',
    'Content-Length': 0,
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
};

var offset = 61950

setInterval(() => {

    var url = `xxx
               t=${new Date().getTime()}&appId=3091324&start=1487692800000&end=1487951999000&limit=20
               &offset=${offset}`
    request
        .post(url)
        .set(headers)
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) console.trace(err)
            var data = [];
            res.body.msg && res.body.msg.list.forEach((v) => data.push(v.phone.replace('+86-', '')))
            fs.writeFile('./data.json', data + ',', {'flag': 'a'}, err => {
                if (err) console.trace(err)
                console.trace(`data ${offset}`, data)
            });
        });


    if (offset > 80900) {
        console.trace('停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停停')
        url = '/'
    }

    offset += 10


}, 20);
