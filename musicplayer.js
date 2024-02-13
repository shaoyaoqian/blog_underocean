// console.log("musicplayer")


// url_base = "https://netease.pengfeima.cn"

// loadCSS("https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.css");



// var NeteaseMusicAPI = {
//     download_lyric: async (id) => {
//         console.log('Downloading lyric...', id)
//         url = url_base + "/lyric"
//         params = {
//             'id': id
//         }
//         // 成功的回调函数
//         function download_lyric_success(result) {
//             console.log("Downloaded successfully.");
//             return result;
//         }

//         // 失败的回调函数
//         function download_lyric_fail(error) {
//             console.log("Failed to download." + error);
//         }

//         var result = fly.request(url, params).then(download_lyric_success, download_lyric_fail);
//         var data = await result.then((result) => { return result['data']['lrc']['lyric'] });
//         return data;
//     },
//     download_song_detail: async (id) => {
//         url = url_base + "/song/detail"
//         params = {
//             'ids': id
//         }

//         var result = fly.request(url, params).then(
//             (result) => {
//                 console.log("Downloaded successfully.");
//                 console.log(result['data']['songs'][0]['name']);
//                 console.log(result['data']['songs'][0]['ar'][0]['name']);
//                 console.log(result['data']['songs'][0]['al']['picUrl']);
//                 var details = {};
//                 details['name'] = result['data']['songs'][0]['name'];
//                 details['singer'] = result['data']['songs'][0]['ar'][0]['name'];
//                 details['pic'] = result['data']['songs'][0]['al']['picUrl'];
//                 return details;
//             },
//             (error) => {
//                 console.log("Failed to download. The error is : " + error);
//                 return result;
//             });
//         return result;
//     },
//     download_song_url: (id, level = 'standard') => {
//         url = url_base + "/song/url/v1"
//         params = {
//             'id': id,
//             'level': level
//         }

//         var result = fly.request(url, params).then(
//             (result) => {
//                 console.log("Downloaded successfully.");
//                 url = result['data']['data'][0]['url'];
//                 // 删除 https:// 或者 http://
//                 url = url.replace(/^(http):/, 'https:');
//                 console.log(url);
//                 return url;
//             },
//             (error) => {
//                 console.log("Failed to download. The error is : " + error);
//                 return result;
//             });
//         return result;
//     },
//     layoutDiv: async (cfg) => {
//         var audio = [];
//         // BUG ：此处需要考虑逗号两边有空格的情况
//         var id_list = cfg.song_id.split(',');
//         for (var i = 0; i < id_list.length; i++) {
//             var id = id_list[i];
//             // WARN：资源是异步获取的
//             var lyric = NeteaseMusicAPI.download_lyric(id);
//             var detail = NeteaseMusicAPI.download_song_detail(id);
//             var url = NeteaseMusicAPI.download_song_url(id);
//             var single_song = {};
//             // WARN：获取了资源链接以后才能使用aplayer
//             var details = await detail;
//             single_song['name'] = details['name'];
//             single_song['artist'] = details['singer'];
//             single_song['cover'] = details['pic'];
//             single_song['url'] = await url;
//             single_song['lrc'] = await lyric;
//             audio.push(single_song);
//         }
//         var ap = new APlayer({
//             container: document.getElementById("musicplayer"),
//             mini: true,
//             fixed: false,
//             autoplay: true,
//             theme: '#0899c4',
//             loop: 'all',
//             order: 'random',
//             preload: 'auto',
//             volume: 0.7,
//             mutex: true,
//             listFolded: true,
//             listMaxHeight: 90,
//             lrcType: 1,
//             audio: audio
//         });
//     },
// }

// loadScript("https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js").then(()=>{
//     loadScript("https://unpkg.com/flyio/dist/fly.min.js").then( () =>{
//         var cfg = new Object();
//         cfg.song_id = '16139397,1939751157';
//         NeteaseMusicAPI.layoutDiv(cfg);
//     });
// });

